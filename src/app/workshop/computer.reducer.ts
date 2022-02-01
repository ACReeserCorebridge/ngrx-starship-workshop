/**
 * computer reducer file!
 * 
 * all main computer logic should go in this file
 */
import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { SolarSystemLocation } from "../challenge.service";
import { NavigationData } from "../nav-db.service";
import { echo, engageEngines, engageLasers, engageShields, engageTractorBeam, loadNavDataSuccess, plotCourse } from "./computer.actions";

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
    engine: number,
    course: SolarSystemLocation,
    tractorbeam: boolean,
    shield: number,
    laser: number,
    navs: NavigationData[],
    //TODO: add a lot more state!
}

export const InitialComputerState: ComputerState = {
    echoMessages: [],
    engine: 1,
    shield: 0,
    laser: 0,
    course: 'LEO',
    tractorbeam: true,
    navs: []
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
    on(loadNavDataSuccess, (state, action) => ({
        ...state,
        navs: action.navs
    })),
    on(engageEngines, (state, action) => ({
        ...state,
        engine: action.engine,
    })),
    on(plotCourse, (state, action) => ({
        ...state,
        course: action.course,
    })),
    on(engageTractorBeam, (state, action) => ({
        ...state,
        tractorbeam: action.tractorbeam,
    })),
    on(engageShields, (state, action) => ({
        ...state,
        shield: action.shield,
        laser: action.shield === 10 ? 0 : state.laser
    })),
    on(engageLasers, (state, action) => ({
        ...state,
        laser: action.laser,
    })),
    //TODO: add an on() listener for loadNavDataSuccess that puts NavigationData[] in the state!
    //TODO: use the NavigationData[] to set viewscreen state depending on location and/or course!
    //TODO: add a lot more reducer action logic!
    // https://ngrx.io/guide/store/reducers
    // there should be a lot of logic in here!
);

 