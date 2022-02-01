/**
 * computer reducer file!
 * 
 * all main computer logic should go in this file
 */
import { createReducer, on } from "@ngrx/store";
import { NavigationData } from "../nav-db.service";
import { SolarSystemLocation } from "../challenge.service"; 
import { echo, loadNavDataSuccess, toggleTractorBeam, toggleDocking, toggleLaser, selectEngine, toggleShield} from "./computer.actions";

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
    echoMessages: string[],
    enableTractorBeam: boolean,
    shieldPercentage: number
    navigationData: NavigationData[],
    enableDocking: boolean,
    laserPercentage: number,
    enginePercentage: number
}

export const InitialComputerState: ComputerState = {
    echoMessages: [],
    navigationData: [{
        location: 'LEO',
        leftImage: '/assets/satellite.png',
        centerImage: '/assets/planet.png',
        rightImage: '/assets/spaceStation.png'
    }],
    enableTractorBeam: false,
    shieldPercentage: 0,
    enableDocking: false,
    laserPercentage: 0,
    enginePercentage: 0,
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
    on(toggleTractorBeam, (state, action) => {
        return {
            ...state,
            enableTractorBeam: action.status
        };
    }),
    on(toggleShield, (state, action) => {
        return {
            ...state,
            shieldPercentage: action.percentage
        };
    }),
    on(loadNavDataSuccess, (state, action) => {
        return {
            ...state,
            navigationData: action.navs
        };
    }),
    on(toggleDocking, (state, action) => {
        return {
            ...state,
            enableDocking: action.status
        };
    }),
    on(toggleLaser, (state, action) => {
        return {
            ...state,
            laserPercentage: action.percentage
        };
    }),
    on(selectEngine, (state, action) => {
        return {
            ...state,
            enginePercentage: action.percentage
        };
    }),
);

 