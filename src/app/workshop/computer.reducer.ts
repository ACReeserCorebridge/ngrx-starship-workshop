/**
 * computer reducer file!
 * 
 * all main computer logic should go in this file
 */
import { createReducer, on } from "@ngrx/store";
import { SolarSystemLocation } from "../challenge.service";
import { NavigationData } from "../nav-db.service";
import * as actions from "./computer.actions";

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
    echoMessages: string[],
    navData: NavigationData[]
    shield: number
    engine: number
    docking: boolean
    tractorbeam: boolean,
    laser: number,
    leftImage: string|undefined,
    centerImage: string|undefined,
    rightImage: string|undefined,
    course?: SolarSystemLocation,
    location?: SolarSystemLocation, 
    satelliteView: boolean,
    asteroidView: boolean,
    tractorView: boolean,
    laserView: boolean
}

export const InitialComputerState: ComputerState = {
    echoMessages: [],
    navData: [],
    shield: 0,
    engine: 0,
    docking: false,
    tractorbeam: false,
    laser: 0,
    leftImage: undefined,
    centerImage: undefined,
    rightImage: undefined,
    course: undefined,
    location: undefined,
    satelliteView: false,
    asteroidView: false,
    tractorView: false,
    laserView: false
}

export const computerReducer = createReducer<ComputerState>(
    InitialComputerState,
    on(actions.echo, (state, action) => {
        return {
            ...state,
            echoMessages: [
                action.message, 
                ...state.echoMessages
            ]
        };
    }),
    on(actions.loadNavDataSuccess, (state, action) => {
        return {
            ...state,
            navData: action.navs,
        };
    }),
    on(actions.engageShield, (state, action) => {
        return {
            ...state,
            shield: action.shield,
            laser: 0,
            laserView: false,
        };
    }),
    on(actions.disengageShield, (state, action) => {
        return {
            ...state,
            shield: 0,
            laser: 0,
            laserView: false,
        };
    }),
    on(actions.engageEngine, (state, action) => {
        return {
            ...state,
            engine: action.power,
            laser: 0,
            laserView: false,
        };
    }),
    on(actions.disengageEngine, (state, action) => {
        return {
            ...state,
            engine: 0
        };
    }),
    on(actions.engageDockClamp, (state, action) => {
       return {
              ...state,
              docking: true
       } 
    }),
    on(actions.disengageDockClamp, (state, action) => {
        return {
            ...state,
            docking: false
        }
    }),
    on(actions.engageLaser, (state, action) => {
        return {
            ...state,
            laser: action.power,
            laserView: true, 
            asteroidView: false,
        }
    }),
    on(actions.disengageLaser, (state, action) => {
        return {
            ...state,
            laser: 0,
            laserView: false
        }  
    }),
    on(actions.plotCourse, (state, action) => {
        let _location: SolarSystemLocation = 'LunaOrbit';
        let _satellite = false;
        let _asteroid = false;
        switch (action.location) {
            case('to Luna orbit'):
                _location = 'LunaOrbit';
                _satellite = true;
                break;
            case('to the asteroid belt'):
                _location = 'AsteroidBelt';
                _asteroid = true;
                break;
            case('to LEO'):
                _location = 'LEO';
                break;
            default:
                break;
        }
        return {
            ...state,
            course: _location,
            location: _location,
            satelliteView: _satellite,
            asteroidView: _asteroid,
            
        }   
    }),
    on(actions.engageTractorBeam, (state, action) => {
        return {
            ...state,
            tractorbeam: true,
            tractorView: true
        }
    }),
    on(actions.disengageTractorBeam, (state, action) => {
        return {
            ...state,
            tractorbeam: false,
            tractorView: false,
            satelliteView: false,
        }
    }),

    // https://ngrx.io/guide/store/reducers
    // there should be a lot of logic in here!
);

 