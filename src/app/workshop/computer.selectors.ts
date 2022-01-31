/**
 * computer selector file!
 * 
 * all main computer selectors go in this file
 * 
 * this file should be free of any business logic or Math.random() calls!
 */
import { createSelector } from "@ngrx/store";
import { selectComputer } from "../app.state";
import { SolarSystemLocation } from "../challenge.service";
import { ComputerState } from "./computer.reducer";
import { ViewscreenState } from "./viewscreen/viewscreen.component";

// https://ngrx.io/guide/store/selectors

export const selectViewscreen = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return state.viewScreenState;
    }
);

export const selectEngine = createSelector(
    selectComputer,
    (state: ComputerState) => {
        //TODO: remove all the random state!
        return state.expectationState.engine || 0;
    }
);

export const selectLasers = createSelector(
    selectComputer,
    (state: ComputerState) => {
        //TODO: remove all the random state!
        return state.expectationState.laser || 0;
    }
);

export const selectDockingClamp = createSelector(
    selectComputer,
    (state: ComputerState) => {
        //TODO: remove all the random state!
        return state.expectationState.docking || false;
    }
);

export const selectShields = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return state.expectationState.shield || 0;
    }
);

export const selectTractorbeam = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return state.expectationState.tractorbeam || false;
    }
);
