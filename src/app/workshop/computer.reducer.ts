/**
 * computer reducer file!
 * 
 * all main computer logic should go in this file
 */
import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { SolarSystemLocation } from "../challenge.service";
import { NavigationData } from "../nav-db.service";
import { echo, setObjectLevel, setIsObjectActive, loadNavDataSuccess, plotCourse } from "./computer.actions";

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
    activateableObject: ActivateableObjects,
    course?:SolarSystemLocation,
    navData?: NavigationData[],
    location: SolarSystemLocation
}

export enum ActivateableObjects {
    NoneActive,
    DockingClampActive,
    TractorBeamActive
}

export const InitialComputerState: ComputerState = {
    echoMessages: [],
    enginePower: 0,
    shieldPower: 0,
    laserPower: 0,
    activateableObject: ActivateableObjects.DockingClampActive,
    location: 'LEO'
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
    on(setObjectLevel, (state, action) => {
        switch (action.object) {
            case 'engines':
                return {
                    ... state,
                    enginePower: action.level,
                    location: state.location,
                    course: action.level == 0 ? undefined : state.course,
                }
            case 'shields':
                return {
                    ... state,
                    shieldPower: action.level,
                    enginePower: action.level === 10 ? 0 : state.enginePower,
                    laserPower: action.level === 10 ? 0 : state.laserPower,
                }
            default:
            case 'laser':
                if (action.level > 0 && state.navData) {
                    // laser has fired, so remove asteroid
                    let tempNavData = state.navData.map(x => x.location===state.location ? {...x, centerImage:''} : x);
                    return {
                        ... state,
                        laserPower: action.level,
                        navData: tempNavData,
                    }
                }
                return {
                    ... state,
                    laserPower: action.level,
                }
        }
    }),
    on(setIsObjectActive, (state, action) => {
        if (action.object === 'docking clamp')
            return {
                ... state,
                activateableObject: action.active ? ActivateableObjects.DockingClampActive : ActivateableObjects.NoneActive,
            }
        else {
            if (!action.active && state.navData) {
                // tractor beam gets turned back off, remove satellite
                let tempNavData = state.navData.map(x => x.location===state.location ? {...x, leftImage:''} : x);
                return {
                    ... state,
                    activateableObject: action.active ? ActivateableObjects.TractorBeamActive : ActivateableObjects.NoneActive,
                    navData: tempNavData,
                }
            }
            return {
                ... state,
                activateableObject: action.active ? ActivateableObjects.TractorBeamActive : ActivateableObjects.NoneActive,
            }
        }
    }),
    on(plotCourse, (state, action) => {
        switch (action.course) {
            case 'to LEO':
                return {
                    ... state,
                    course: 'LEO',
                    location: 'LEO'
                }
            case 'to Luna orbit':
                return {
                    ... state,
                    course: 'LunaOrbit',
                    location: 'LunaOrbit'
                }
            case 'to the asteroid belt':
                return {
                    ... state,
                    course: 'AsteroidBelt',
                    location: 'AsteroidBelt'
                }
        }
    }),
    on(loadNavDataSuccess, (state, action) => {
        return {
            ... state,
            navData: action.navs,
        }
    })
);

 