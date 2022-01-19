/**
 * computer reducer file!
 * 
 * all main computer logic should go in this file
 */
import { createReducer, on } from "@ngrx/store";
import { IComputerDirective, IExpectations } from "../challenge.service";
import { NavigationData } from "../nav-db.service";
import { ComputerActions } from "./action-types";
import { echo, loadNavDataSuccess } from "./computer.actions";
import { EngineService } from "./services/engine-service";

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
    //TODO: add a lot more state!
    navs: NavigationData[],
    visualState: Required<IExpectations>
}

export const InitialComputerState: ComputerState = {
    echoMessages: [],
    //TODO: add additional initial state!
    navs: [],
    visualState: {
        docking: true,
        engine: 0,
        laser: 0,
        location: 'LEO',
        course: 'LEO',
        shield: 0,
        tractorbeam: false,
        satelliteView: false,
        asteroidView: false,
        laserView: false,
        tractorView: false,
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
    on(ComputerActions.loadNavDataSuccess, (state, action) => {
        return {
            ...state,
            navs: action.navs
        }
    }),
    on(ComputerActions.switchDockingClamp, (state, action) => {
        return {
            ...state,
            visualState: {
                ...state.visualState,
                docking: action.enable
            }
        }
    }),
    on(ComputerActions.changeEngine, (state, action) => {
        return {
            ...state,
            visualState: {
                ...state.visualState,
                engine: EngineService.ChangeEngineBasedOnDirective(action.directive, state.visualState.engine)
            }
        }
    })

    //TODO: add an on() listener for loadNavDataSuccess that puts NavigationData[] in the state!
    //TODO: use the NavigationData[] to set viewscreen state depending on location and/or course!
    //TODO: add a lot more reducer action logic!
    // https://ngrx.io/guide/store/reducers
    // there should be a lot of logic in here!
);

