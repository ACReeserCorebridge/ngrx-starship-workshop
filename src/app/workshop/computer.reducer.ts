/**
 * computer reducer file!
 *
 * all main computer logic should go in this file
 */
import { createReducer, on } from "@ngrx/store";
import { NavigationData } from "../nav-db.service";
import { SolarSystemLocation } from '../challenge.service';
import { 
    echo,
    disengageDockingClamp, 
    disengageEngine, 
    disengageTractorbeam, 
    engageTractorbeam, 
    fullyEngageEngine,
    halfwayEngageEngine, 
    plotCourseLunaOrbit,
    plotCourseAsteroidBelt, 
    slowlyEngageEngine, 
    halfwayEngageShields,
    fullyEngageShields,
    halfwayEngageLaser,
    plotCourseLEO,
    disengageShields,
    engageDockingClamp,
    loadNavDataSuccess} from './computer.actions';

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
    engine: number;
    docking: boolean;
    shield: number;
    tractorbeam: boolean;
    tractorView: boolean;
    satelliteView: boolean;
    course?: SolarSystemLocation;
    location?: SolarSystemLocation;
    laserView:boolean;
    asteroidView?:boolean;
    laser: number;
    navData: NavigationData[];
}

export const InitialComputerState: ComputerState = {
    echoMessages: [],
    navData: [],
    docking: true,
    engine: 0,
    laser: 0,
    course: 'LEO',
    location: 'LEO',
    shield: 0,
    tractorbeam: false,
    satelliteView: false,
    asteroidView: false,
    laserView: false,
    tractorView: false,
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
    on(loadNavDataSuccess, (state, action) => {
        return {
            ...state,
            navData: action.navs
        }
    }),
    on(disengageDockingClamp, (state, action) => {
        return {
            ...state,
            docking: false
        }
    }),
    on(slowlyEngageEngine, (state, action) => {
        return {
            ...state,
            engine: 1
        }
    }),
    on(fullyEngageEngine, (state, action) => {
        return {
            ...state,
            engine: 10,
            location: state.course!
        }
    }),
    on(plotCourseLunaOrbit, (state, action) => {
        return {
            ...state,
            course: 'LunaOrbit',
            satelliteView: true
        }
    }),
    on(disengageEngine, (state, action) => {
        return {
            ...state,
            engine: 0,
        }
    }),
    on(engageTractorbeam, (state, action) => {
        return {
            ...state,
            tractorbeam: true,
            tractorView: true
        }
    }),
    on(disengageTractorbeam, (state, action) => {
        return {
            ...state,
            satelliteView: false,
            tractorbeam: false,
            tractorView: false,
            location: undefined
        }
    }),
    on(plotCourseAsteroidBelt, (state, action) => {
        return {
            ...state,
            course: 'AsteroidBelt'
        }
    }),
    on(halfwayEngageShields, (state, action) => {
        return {
            ...state,
            shield: 5,
            laserView: false,
            asteroidView: true
        }
    }),
    on(halfwayEngageEngine, (state, action) => {
        return {
            ...state,
            engine: 5,
            location: state.course!
        }
    }),
    on(halfwayEngageLaser, (state, action) => {
        return {
            ...state,
            location: 'AsteroidBelt',
            laser: 5,
            laserView: true,
            asteroidView: false
        }
    }),
    on(fullyEngageShields, (state, action) => {
        return {
            ...state,
            shield: 10,
            laser: 0,
            laserView: false,
        }
    }),
    on(disengageShields, (state, action) => {
        return {
            ...state,
            shield: 0
        }
    }),
    on(plotCourseLEO, (state, action) => {
        return {
            ...state,
            course: 'LEO'
        }
    }),
    on(engageDockingClamp, (state, action) => {
        return {
            ...state,
            docking: true
        }
    }),

);

