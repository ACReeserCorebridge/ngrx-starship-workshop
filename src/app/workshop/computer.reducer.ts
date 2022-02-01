/**
 * computer reducer file!
 * 
 * all main computer logic should go in this file
 */
import { act } from "@ngrx/effects";
import { createReducer, on, State } from "@ngrx/store";
import { IExpectations, SolarSystemLocation } from "../challenge.service";
import { NavigationData } from "../nav-db.service";
import { echo, activateDockingClamp, activateTractorBeam, engageEngine, disengageEngine, plotCourse, loadNavDataSuccess, activateShield, deactivateShield, activateLaser, deactivateLaser, deactivateTractorBeam } from "./computer.actions";
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
    echoMessages: string[],
    shield?:number,
    engine?:number,
    laser?:number,
    location?:SolarSystemLocation,
    course?:SolarSystemLocation,
    docking?:boolean,
    tractorbeam?:boolean,
    satelliteView?:boolean,
    asteroidView?: boolean,
    tractorView?:boolean,
    laserView?:boolean,
    leftImage: string | undefined,
    centerImage: string | undefined,
    rightImage: string | undefined,
    navData: NavigationData[]
}

export const InitialComputerState: ComputerState = {
    echoMessages: [],
    shield: 0,
    engine: 0,
    laser: 0,
    location: 'LunaOrbit',
    course: undefined,
    docking: false,
    tractorbeam: false,
    satelliteView: false,
    asteroidView:  false,
    tractorView: false,
    laserView: false,
    leftImage: undefined,
    centerImage: undefined,
    rightImage: undefined,
    navData: []
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
    on(activateDockingClamp, (state, action) => {
        return {
            ...state,
            docking: action.verb == 'engage'
        }
    }),
    on(activateTractorBeam, (state) => {
        return {
            ...state,
            tractorbeam: true,
            tractorView: true
        }
    }),
    on(deactivateTractorBeam, (state) => {
        return {
            ...state,
            tractorbeam: false,
            tractorView: false,
            satelliteView: false,
            leftImage: undefined
        }
    }),
    on(engageEngine, (state, action) => {
        let engineSpeed;
        if (action.adverb == 'fully')
            engineSpeed = 10;
        else if (action.adverb == 'halfway')
            engineSpeed = 5;
        else
            engineSpeed = 1;

        return {
            ...state,
            engine: engineSpeed,
            laser: engineSpeed == 10 ? 0 : state.laser,
            shield: engineSpeed == 10 ? 0 : state.shield
        }
    }),
    on(disengageEngine, (state, action) => {
        return {
            ...state,
            engine: 0
        }
    }),
    on(activateShield, (state, action) => {
        let shieldPower;
        if (action.adverb == 'fully')
            shieldPower = 10;
        else if (action.adverb == 'halfway')
            shieldPower = 5;
        else
            shieldPower = 1;
        return {
            ...state,
            shield: shieldPower,
            laser: shieldPower == 10 ? 0 : state.laser,
            laserView: shieldPower == 10 ? false : state.laserView,
            asteroidView: shieldPower == 10 ? false : state.asteroidView,
            engine: shieldPower == 10 ? 0 : state.engine
        }
    }),
    on(deactivateShield, (state) => {
        return {
            ...state,
            shield: 0
        }
    }),
    on(activateLaser, (state, action) => {
        let laserPower;
        if (action.adverb == 'fully')
            laserPower = 10;
        else if (action.adverb == 'halfway')
            laserPower = 5;
        else
            laserPower = 1;
        return {
            ...state,
            laser: laserPower,
            laserView: true,
            shield: laserPower == 10 ? 0 : state.shield,
            engine: laserPower == 10 ? 0 : state.engine
        };
    }),
    on(deactivateLaser, (state, action) => {
        return {
            ...state,
            laser: 0,
            laserView: false
        };
    }),
    on(plotCourse, (state, action) => {
        let courseData = state.navData.find(x => x.location == action.course);

        return {
            ...state,
            course: action.course,
            location: action.course,
            satelliteView: action.course == 'LunaOrbit',
            asteroidView: action.course == 'AsteroidBelt',
            leftImage: courseData?.leftImage,
            centerImage: courseData?.centerImage,
            rightImage: courseData?.rightImage,
        }
    }),
    on(loadNavDataSuccess, (state, action) => {
        return {
            ...state,
            navData: [...state.navData, ...action.navs]
        }
    })
);

 