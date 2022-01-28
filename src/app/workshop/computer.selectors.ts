/**
 * computer selector file!
 *
 * all main computer selectors go in this file
 *
 * this file should be free of any business logic or Math.random() calls!
 */
import { state } from "@angular/animations";
import { createSelector } from "@ngrx/store";
import { selectComputer } from "../app.state";
import { SolarSystemLocation } from "../challenge.service";
import { ComputerState } from "./computer.reducer";
import { ViewscreenState } from "./viewscreen/viewscreen.component";

// https://ngrx.io/guide/store/selectors

export const selectViewscreen = createSelector(
    selectComputer,
    (state: ComputerState) => {
        const view: ViewscreenState = {
            location: state.location,
            course: state.course,
            leftImage: state.leftImage,
            centerImage: state.centerImage,
            rightImage: state.rightImage,
            laser: state.laser > 0, // 0 - 10
            tractor: state.tractorbeam,
        };
        return view;
    }
);

export const selectEngine = createSelector(
    selectComputer,
    (state: ComputerState) => state.engine
);

export const selectLasers = createSelector(
    selectComputer,
    (state: ComputerState) => state.laser
);

export const selectDockingClamp = createSelector(
    selectComputer,
    (state: ComputerState) => state.docking
);

export const selectShields = createSelector(
  selectComputer,
  (state: ComputerState) => state.shield
);

export const selectTractorbeam = createSelector(
  selectComputer,
  (state: ComputerState) => state.tractorbeam
);

export const selectEchoMessage = createSelector(
  selectComputer,
  (state: ComputerState) => state.echoMessages
);
