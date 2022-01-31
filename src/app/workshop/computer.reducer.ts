/**
 * computer reducer file!
 * 
 * all main computer logic should go in this file
 */
import { createReducer, on } from "@ngrx/store";
import { IComputerDirective, IExpectations, SolarSystemLocation } from "../challenge.service";
import { NavigationData } from "../nav-db.service";
import { course, dockingClamp, echo, engines, laser, loadNavDataSuccess, shields, tractorbeam } from "./computer.actions";
import { ViewscreenState } from "./viewscreen/viewscreen.component";

/**
 * This is the "slice" that you need to fill out!
 * 
 * Course data, location data, engine/shield/laser power level, all 
 * of these state properties must reside in this interface!
 * 
 * All of the visual components will select their state from this central
 * state location.
 */
export interface ComputerState {
    /**
     * these messages are displayed by the computer-messages component
     * 
     * they are not required or useful, they are just example of state properties
     * 
     * feel free to change or remove this
     */
    echoMessages: string[];
    expectationState: IExpectations;
    viewScreenState: ViewscreenState;
    navigationData: NavigationData[];
    //TODO: add a lot more state!
}

export const InitialComputerState: ComputerState = {
    echoMessages: [],
    expectationState: {
        asteroidView: undefined,
        course: 'LEO',
        docking: false,
        engine: 0,
        laser: 0,
        laserView: false,
        location: 'LEO',
        satelliteView: false,
        shield: 0,
        tractorView: false,
        tractorbeam: false
    },
    navigationData: [],
    viewScreenState: {
        centerImage: undefined,
        laser: false,
        leftImage: undefined,
        location: 'LEO',
        rightImage: undefined,
        tractor: false,
        course: undefined
    }
    //TODO: add additional initial state!
}

export const MAX_POWER = 10;
export const MIN_POWER = 1;

export function processAdverb(directive: IComputerDirective) {
    if (directive.adverb) {
        if (directive.adverb === 'fully') {
            return MAX_POWER;
        } else if (directive.adverb === 'halfway') {
            return MAX_POWER / 2;
        }
    }

    return MIN_POWER;
}

export function processAdjectivalPhrase(directive: IComputerDirective): SolarSystemLocation | undefined {
    if (directive.adjectivalPhrase) {
        if (directive.adjectivalPhrase === 'to Luna orbit') {
            return 'LunaOrbit';
        } else if (directive.adjectivalPhrase === 'to LEO') {
            return 'LEO';
        } else if (directive.adjectivalPhrase === 'to the asteroid belt') {
            return 'AsteroidBelt'
        }
    }

    return undefined;
}

export const computerReducer = createReducer<ComputerState>(
    InitialComputerState,
    on(echo, (state, action) => {
        return {
            ...state,
            echoMessages: [
                action.message,
                ...state.echoMessages
            ]
        };
    }),
    on(shields, (state, action) => {
        let shield = 0;
        if (action.directive.verb === 'engage') {
            shield = processAdverb(action.directive);
        } else if (action.directive.verb === 'disengage') {
            shield = 0;
        }
        return {
            ...state,
            expectationState: {
                ...state.expectationState,
                shield,
                laser: shield >= MAX_POWER ? 0 : state.expectationState.laser,
                engine: shield >= MAX_POWER ? 0 : state.expectationState.engine,
            },
            viewScreenState: {
                ...state.viewScreenState,
                laser: shield >= MAX_POWER ? false : state.viewScreenState.laser,
                leftImage: shield >= MAX_POWER ? undefined : state.viewScreenState.leftImage,
                centerImage: shield >= MAX_POWER ? undefined : state.viewScreenState.centerImage,
            }
        };
    }),
    on(engines, (state, action) => {
        let engine = 0;
        if (action.directive.verb === 'engage') {
            engine = processAdverb(action.directive);
        } else if (action.directive.verb === 'disengage') {
            engine = 0;
        }
        return {
            ...state,
            expectationState: {
                ...state.expectationState,
                engine,
                laser: engine >= MAX_POWER ? 0 : state.expectationState.laser,
                shield: engine >= MAX_POWER ? 0 : state.expectationState.shield,
                asteroidView: engine > MIN_POWER
            },
            viewScreenState: {
                ...state.viewScreenState,
                centerImage: action.directive.verb === 'disengage' ? undefined : state.viewScreenState.centerImage
            }
        };
    }),
    on(laser, (state, action) => {
        let laser = 0;
        if (action.directive.verb === 'engage') {
            laser = processAdverb(action.directive);
        } else if (action.directive.verb === 'disengage') {
            laser = 0;
        }
        return {
            ...state,
            expectationState: {
                ...state.expectationState,
                laser,
                engine: laser >= MAX_POWER ? 0 : state.expectationState.engine,
                shield: laser >= MAX_POWER ? 0 : state.expectationState.shield,
                laserView: laser > MIN_POWER
            },
            viewScreenState: {
                ...state.viewScreenState,
                laser: laser > MIN_POWER
            }
        };
    }),
    on(dockingClamp, (state, action) => {
        let docking = false;
        if (action.directive.verb === 'engage') {
            docking = true;
        } else if (action.directive.verb === 'disengage') {
            docking = false;
        }
        return {
            ...state,
            expectationState: {
                ...state.expectationState,
                docking,
            }
        };
    }),
    on(tractorbeam, (state, action) => {
        let tractorbeam = false;
        if (action.directive.verb === 'engage') {
            tractorbeam = true;
        } else if (action.directive.verb === 'disengage') {
            tractorbeam = false;
        }
        return {
            ...state,
            expectationState: {
                ...state.expectationState,
                tractorbeam,
                tractorView: tractorbeam,
                satelliteView: action.directive.verb === 'disengage' ? false : state.expectationState.satelliteView
            },
            viewScreenState: {
                ...state.viewScreenState,
                leftImage: action.directive.verb === 'disengage' ? undefined : state.viewScreenState.leftImage,
                tractor: tractorbeam
            }
        };
    }),
    on(course, (state, action) => {
        let viewScreenState: ViewscreenState = InitialComputerState.viewScreenState;
        const screenState = processAdjectivalPhrase(action.directive);
        const navSource = state.navigationData.find(d => d.location === screenState);
        if (navSource != null) {
            viewScreenState = {
                centerImage: navSource.centerImage,
                laser: state.expectationState.laserView || false,
                leftImage: navSource.leftImage,
                location: navSource.location,
                rightImage: navSource.rightImage,
                tractor: screenState === 'LunaOrbit',
                course: screenState
            };
        }
        return {
            ...state,
            expectationState: {
                ...state.expectationState,
                course: screenState,
            },
            viewScreenState
        };
    }),
    on(loadNavDataSuccess, (state, action) => {
        return {
            ...state,
            navigationData: action.navs
        };
    })
    //TODO: add an on() listener for loadNavDataSuccess that puts NavigationData[] in the state!
    //TODO: use the NavigationData[] to set viewscreen state depending on location and/or course!
    //TODO: add a lot more reducer action logic!
    // https://ngrx.io/guide/store/reducers
    // there should be a lot of logic in here!
);

