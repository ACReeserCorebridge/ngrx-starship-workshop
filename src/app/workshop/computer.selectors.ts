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
            const view: ViewscreenState = {
        location: state.navigationData[0].location,
        course: state.navigationData[0].location,
        leftImage: state.navigationData[0].leftImage,
        centerImage: state.navigationData[0].centerImage,
        rightImage: state.navigationData[0].rightImage,
        laser: state.laserIntesity >= 5,
        tractor: state.tractorBeamEnabled,
      };
      return view;
    }
);

export const selectEngine = createSelector(
  selectComputer,
  (state: ComputerState) => {
    return state.speed
  }
);

export const selectLasers = createSelector(
  selectComputer,
  (state: ComputerState) => {
    return state.laserIntesity;
  }
);

export const selectDockingClamp = createSelector(
  selectComputer,
  (state: ComputerState) => {
    return state.engaged
  }
);

export const selectShields = createSelector(
  selectComputer,
  (state: ComputerState) => {
    return state.armour;
  }
);

export const selectTractorbeam = createSelector(
  selectComputer,
  (state: ComputerState) => {
    return state.tractorBeamEnabled;
  }
);
