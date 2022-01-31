/**
 * computer reducer file!
 * 
 * all main computer logic should go in this file
 */
import { createReducer, on } from "@ngrx/store";
import { IExpectations, SolarSystemLocation } from "../challenge.service";
import { NavigationData } from "../nav-db.service";
import { docking, echo, loadNavDataSuccess, engine, course, tractorbeam, shield, laser } from "./computer.actions";
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
export interface ComputerState{
    /**
     * these messages are displayed by the computer-messages component
     * 
     * they are not required or useful, they are just example of state properties
     * 
     * feel free to change or remove this
     */
    echoMessages: string[]
    expectations: IExpectations;
    viewscreen: ViewscreenState;
    navigationData: NavigationData[];
}

export const InitialComputerState: ComputerState = {
    echoMessages: [],
    expectations: {
        shield: 0,
        engine: 0,
        laser: 0,
        location: 'LEO',
        course: 'LEO',
        docking: false,
        tractorbeam: false,
        satelliteView: false,
        asteroidView: false,
        tractorView: false,
        laserView: false
    },
    viewscreen: {
        location: 'LEO',
        course: undefined,
        leftImage: undefined,
        centerImage: undefined,
        rightImage: undefined,
        laser: false,
        tractor: false,
    },
    navigationData: []
    //TODO: add additional initial state!
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

    on(docking, (state, action) => {
        let docking = false;
        switch(action.directive.verb) {
            case 'engage':
                docking = true;
                break;
            case 'disengage':
                docking = false;
                break;
        }
        return {
            ...state,
            expectations: {
                ...state.expectations,
                docking
            }
        };
    }),

    on(engine, (state, action) => {
        let engine = 0;
        let shield = state.expectations.shield;
        let laser = state.expectations.laser;
        let asteroidView = state.expectations.asteroidView;

        switch(action.directive.verb) {
            case 'engage':
                switch(action.directive.adverb) {
                    case 'fully':
                        engine = 10;
                        shield = laser = 0;
                        break;
                    case 'halfway':
                        engine = 5;
                        break;
                    default:
                        engine = 1;
                }
                break;
            case 'disengage':
                if(state.expectations.location == 'AsteroidBelt')
                    asteroidView = false;
                engine = 0;
        }  
        return {
            ...state,
            expectations: {
                ...state.expectations,
                engine,
                shield,
                laser,
                asteroidView: asteroidView
            },
            viewscreen: {
                ...state.viewscreen,
                centerImage: (state.expectations.location == 'AsteroidBelt' && !asteroidView) ? undefined : state.viewscreen.centerImage
            }
        };
    }),

    on(course, (state, action) => {
        let course = state.expectations.course;
        switch(action.directive.adjectivalPhrase) {
            case 'to LEO':
                course = 'LEO';
                break;
            case 'to Luna orbit':
                course = 'LunaOrbit'
                break;
            case 'to the asteroid belt':
                course = 'AsteroidBelt'
                break;
        }

        let courseData = state.navigationData.find(nav => nav.location == course);
        if(courseData)
            return {
                ...state,
                expectations: {
                    ...state.expectations,
                    course: course,
                    location: course,
                    asteroidView: course == 'AsteroidBelt'
                },
                viewscreen: {
                    ...state.viewscreen,
                    course: course,
                    leftImage: courseData.leftImage,
                    centerImage: courseData.centerImage,
                    rightImage: courseData.rightImage,
                    location: courseData.location
                }
            }
        else
            return {
                ...state
            }
    }),

    on(tractorbeam, (state, action) => {
        let tractorbeam = state.expectations.tractorbeam;
        let satelliteView = state.expectations.satelliteView;

        switch(action.directive.verb) { 
            case 'engage':
                tractorbeam = satelliteView = true;
                break;
            case 'disengage':
                tractorbeam = satelliteView = false;
                break;
        }
        return {
            ...state,
            expectations: {
                ...state.expectations,
                tractorbeam: tractorbeam,
                tractorView: tractorbeam,
            },
            viewscreen: {
                ...state.viewscreen,
                tractor: tractorbeam ? tractorbeam : false,
                leftImage: !satelliteView ? undefined : state.viewscreen.leftImage
            }
        }
    }),

    on(shield, (state, action) => {
        let shield = 0;
        let laser = state.expectations.laser || 0;
        let engine = state.expectations.engine || 0;
        let laserPower = false;

        if(laser)
            laserPower = laser > 0;

        switch(action.directive.verb) { 
            case 'engage':
                switch(action.directive.adverb) {
                    case 'fully':
                        shield = 10;
                        laser = engine = 0;
                        laserPower = false;
                        break;
                    case 'halfway':
                        shield = 5;
                        break;
                }
                break;
            case 'disengage':
                shield = 0;
                break;
        }

        return {
            ...state,
            expectations: {
                ...state.expectations,
                shield,
                laser,
                engine
            },
            viewscreen: {
                ...state.viewscreen,
                laser: laserPower
            }
        }
    }),

    on(laser, (state, action) => {
        let laser = 0;
        let engine = state.expectations.engine;
        let shield = state.expectations.shield;
        switch(action.directive.verb) { 
            case 'engage':
                switch(action.directive.adverb) {
                    case 'fully':
                        laser = 10;
                        engine = shield = 0;
                        break;
                    case 'halfway':
                        laser = 5;
                        break;
                }
                break;
            case 'disengage':
                laser = 0;
                break;
        }

        return {
            ...state,
            expectations: {
                ...state.expectations,
                laser,
                engine,
                shield,
                laserView: laser > 0
            },
            viewscreen: {
                ...state.viewscreen,
                laser: laser > 0 
            }
        }
    }),

    on(loadNavDataSuccess, (state, action) => {
        let currentLocation = action.navs.find(nav => nav.location == state.expectations.location)

        if(currentLocation)
            return {
                ...state,
                viewscreen: {
                    ...state.viewscreen,
                    leftImage: currentLocation.leftImage,
                    centerImage: currentLocation.centerImage,
                    rightImage: currentLocation.rightImage
                },
                navigationData: action.navs
            }
        else
            return state;
    })
    //TODO: add an on() listener for loadNavDataSuccess that puts NavigationData[] in the state!
    //TODO: use the NavigationData[] to set viewscreen state depending on location and/or course!
    //TODO: add a lot more reducer action logic!
    // https://ngrx.io/guide/store/reducers
    // there should be a lot of logic in here!
);

 