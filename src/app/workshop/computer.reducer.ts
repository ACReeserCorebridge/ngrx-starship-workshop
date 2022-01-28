/**
 * computer reducer file!
 * 
 * all main computer logic should go in this file
 */
import { createReducer, on } from "@ngrx/store";
import { SolarSystemLocation } from "../challenge.service";
import { NavigationData } from "../nav-db.service";
import { echo, loadNavData, loadNavDataError, loadNavDataSuccess, setDockingClamp, setEnginePower, setLaserPower, setLaserView, setShieldPower, setTractorBeam, setTractorView, setViewScreenState } from "./computer.actions";
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
    enginePower: number,
    shieldPower: number,
    laserPower: number,
    location?:SolarSystemLocation,
    course?:SolarSystemLocation,
    docking:boolean,
    tractorbeam:boolean,
    viewScreenState:ViewscreenState,
    navigationData: NavigationData[]
}

export const InitialComputerState: ComputerState = {
    echoMessages: [],
    enginePower: 0,
    shieldPower: 0,
    laserPower: 0,
    location:undefined,
    course:undefined,
    docking:false,
    tractorbeam:false,
    navigationData: [],
    viewScreenState: {
        location: 'LunaOrbit',
        course: undefined,
        leftImage: undefined,
        centerImage: undefined,
        rightImage: undefined,
        laser: false,
        tractor: false,
    }
    
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
    on(setEnginePower, (state, action ) => {
        return {
            ...state,
            enginePower: action.value 
        };
    }),
    on(setLaserPower, (state, action ) => {
        return {
            ...state,
            laserPower: action.value,
            viewScreenState: {...state.viewScreenState, laser: action.value>0, centerImage: action.value>0 ? undefined : '/assets/asteroid.gif'} 
        };
    }),
    on(setShieldPower, (state, action ) => {
        var laserPower = action.value > 0 ? 0 : state.laserPower;
        return {
            ...state,
            laserPower: laserPower,         
            shieldPower: action.value,
            viewScreenState: {...state.viewScreenState, laser: laserPower > 0} 
        };
    }),
    on(setDockingClamp, (state, action ) => {
        return {
            ...state,
            docking: action.value 
        };
    }),
    on(setTractorBeam, (state, action ) => {
        return {
            ...state,
            tractorbeam: action.value,
            viewScreenState: {...state.viewScreenState, tractor: action.value, leftImage: action.value ? '/assets/satellite.png' : undefined} 
        };
    }),
    on(setDockingClamp, (state, action ) => {
        return {
            ...state,
            docking: action.value 
        };
    }),
    on(setTractorView, (state, action ) => {
        return {
            ...state,
            tractorView: action.value 
        };
    }),
    on(setLaserView, (state, action ) => {
        return {
            ...state,
            laserView: action.value 
        };
    }),
    on(loadNavData, (state,action) => {
        return {
            ...state
        }
    }),
    on(loadNavDataSuccess, (state,action) => {
        return {
            ...state,
            navigationData: action.navs
        }
    }),
    on(loadNavDataError, (state,action) => {
        return {
            ...state
        }
    }),
    on(setViewScreenState, (state,action) => {
        var navData = state.navigationData.find (x => x.location==action.value);
        var viewPortState: ViewscreenState = {
            location: action.value,
            course: action.value,
            leftImage: navData?.leftImage,
            centerImage: navData?.centerImage,
            rightImage: navData?.rightImage,
            laser: state.laserPower>0,
            tractor: state.tractorbeam
        };
        
        return {
            ...state,
            viewScreenState: viewPortState
        }
    })

    
);

 