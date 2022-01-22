import { disengageDockingClamp, 
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
    engageDockingClamp} from './computer.actions';
/**
 * computer reducer file!
 *
 * all main computer logic should go in this file
 */
import { createReducer, on } from "@ngrx/store";
import { NavigationData } from "../nav-db.service";
import { echo, loadNavDataSuccess } from "./computer.actions";
import { SolarSystemLocation } from '../challenge.service';

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
    shields: number;
    tractorbeam: boolean;
    tractorView: boolean;
    satelliteView: boolean;
    course?: SolarSystemLocation;
    laserView?:boolean;
    asteroidView?:boolean;


    //TODO: add a lot more state!
}

export const InitialComputerState: ComputerState = {
    echoMessages: [],
    engine: 0,
    docking: true,
    shields: 0,
    tractorbeam: false,
    satelliteView: false,
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
            engine: 10
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
            engine: 0
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
            tractorView: false
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
            shields: 5,
            laserView: false,
            asteroidView: true
        }
    }),
    on(halfwayEngageEngine, (state, action) => {
        return {
            ...state,
            engine: 5,
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
            shields: 10,
            laserView: false,
        }
    }),
    on(disengageShields, (state, action) => {
        return {
            ...state,
            shields: 0
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
            dockingO: true
        }
    }),



    //TODO: add an on() listener for loadNavDataSuccess that puts NavigationData[] in the state!
    //TODO: use the NavigationData[] to set viewscreen state depending on location and/or course!
    //TODO: add a lot more reducer action logic!
    // https://ngrx.io/guide/store/reducers
    // there should be a lot of logic in here!
);

