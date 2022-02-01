/**
 * computer reducer file!
 * 
 * all main computer logic should go in this file
 */
import { createReducer, on } from "@ngrx/store";
import { NavigationData } from "../nav-db.service";
import * as act from "./computer.actions";

export enum ShipFeature {
    TractorOnline = 1 << 0,
    TractorOffline = 1 << 1,
    DockingOnline = 1 << 2,
    DockingOffline = 1 << 3,
}

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
    echoMessages: string[],
    /**
     * the amount of power to the shield.
     * 
     * Must be from 0-10
     */
    shields: number,
    /**
     * the amount of power to the engine.
     * 
     * Must be from 0-10
     */
    engines: number,
    /**
     * the amount of power to the laser.
     * 
     * Must be from 0-10
     */
    laser: number,
    currentLocation?: NavigationData,
    shipFeatures: ShipFeature
    onCourse: boolean // onCourse
}

export const InitialComputerState: ComputerState = {
    echoMessages: [],
    onCourse: false,
    shields: 0,
    engines: 0,
    laser: 0,
    shipFeatures: ShipFeature.DockingOnline | ShipFeature.TractorOffline
}

export const computerReducer = createReducer<ComputerState>(
    InitialComputerState,
    on(act.echo, (state, action) => {
        return {
            ...state,
            echoMessages: [
                ...action.messages,
                ...state.echoMessages,
            ]
        };
    }),
    on(act.loadNavDataSuccess, (state, action) => {
        return {
            ...state,
            currentLocation: action.navs
        };
    }),
    on(act.engage, (state, action) => {
        let newState: Partial<ComputerState> = {};

        newState.shipFeatures = state.shipFeatures;

        if (action.keyID === 'docking') {
            newState.shipFeatures |= ShipFeature.DockingOnline;
            newState.shipFeatures &= ~ShipFeature.DockingOffline;
        }

        if (action.keyID === 'tractorbeam') {
            newState.shipFeatures |= ShipFeature.TractorOnline;
            newState.shipFeatures &= ~ShipFeature.TractorOffline;
        }

        if (action.keyID === 'laser' || action.keyID === 'docking') {
            newState.engines = 0;

            if (action.param.laser == 5) {
                newState.onCourse = false;
            }
            else if (action.param.laser == 10) {
                newState.shields = 0;
            }
        }

        //Exploding!
        if (action.param.laser === 5) {
            if (state.currentLocation?.location === 'AsteroidBelt') {
                newState.currentLocation = <NavigationData>{
                    location: state.currentLocation?.location,
                    leftImage: state.currentLocation?.leftImage,
                    centerImage: '/assets/real_explode.gif',
                    rightImage: state.currentLocation?.rightImage
                };
            }
        }

        if (action.keyID === 'engines') {
            newState.shipFeatures |= ShipFeature.DockingOffline;
            newState.shipFeatures &= ~ShipFeature.DockingOnline;

            if (action.param.engines == 5) {
                newState.shields = 5;
                if (state.currentLocation?.location === "AsteroidBelt") {
                    newState.onCourse = false;
                }
            } else if (action.param.engines == 10) {
                newState.laser = 0;
                newState.shields = 0;

                if (state.currentLocation?.location === "LEO") {
                    newState.onCourse = false;
                }
            }
        }

        if (action.param.shields == 10) {
            newState.laser = 0;
            newState.engines = 0;

            if (state.currentLocation?.location === 'AsteroidBelt') {
                newState.currentLocation = <NavigationData>{
                    location: state.currentLocation?.location,
                    leftImage: state.currentLocation?.leftImage,
                    centerImage: undefined,
                    rightImage: state.currentLocation?.rightImage
                };
            }
        }

        return {
            ...state,
            ...action.param,
            ...newState
        };
    }),
    on(act.disengage, (state, action) => {
        let newState: Partial<ComputerState> = {};

        newState.shipFeatures = state.shipFeatures;

        if (action.keyID === 'docking') {
            newState.shipFeatures |= ShipFeature.DockingOffline;
            newState.shipFeatures &= ~ShipFeature.DockingOnline;
        }

        if (action.keyID === 'tractorbeam') {
            newState.shipFeatures |= ShipFeature.TractorOffline;
            newState.shipFeatures &= ~ShipFeature.TractorOnline;

            if (state.currentLocation?.location === 'LunaOrbit') {
                newState.currentLocation = <NavigationData>{
                    location: state.currentLocation?.location,
                    leftImage: undefined,
                    centerImage: state.currentLocation?.centerImage,
                    rightImage: undefined
                };
            }
        }

        if (action.keyID === 'engines') {
            newState.onCourse = false;
            newState.engines = 0;
        }

        return {
            ...state,
            ...action.param,
            ...newState
        };
    }),
    on(act.plot, (state, action) => {
        let newState: Partial<ComputerState> = {};

        newState.currentLocation = action.currentLocation;
        newState.onCourse = true;

        if (newState.currentLocation.location === "AsteroidBelt") {
            newState.shields = 5;
            newState.engines = 5;
        } else if (newState.currentLocation.location === "LunaOrbit") {
            newState.engines = 10;
        } else if (newState.currentLocation.location === "LEO") {
            newState.shields = 0;
        }

        return {
            ...state,
            ...newState
        };
    }),
);