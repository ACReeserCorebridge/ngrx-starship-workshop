/**
 * computer selector file!
 *
 * all main computer selectors go in this file
 *
 * this file should be free of any business logic or Math.random() calls!
 */
import { createSelector } from "@ngrx/store";
import { selectComputer } from "../app.state";
import { NavigationData } from "../nav-db.service";
import { ComputerState } from "./computer.reducer";
import { ViewscreenState } from "./viewscreen/viewscreen.component";

// https://ngrx.io/guide/store/selectors


export const selectCurrentNavLocationData = createSelector(
  selectComputer,
  (state: ComputerState) => {
    return state.navs.find(nav => nav.location == state.location)
  }
);

export const selectLaserView = createSelector(
  selectComputer,
  (state: ComputerState) => {
    return state.laser > 0;
  }
);

export const selectTractorView = createSelector(
  selectComputer,
  (state: ComputerState) => {
    return state.tractorbeam;
  }
);

export const selectSatelliteView = createSelector(
  selectComputer,
  (state: ComputerState) => {
    return state.satelliteView;
  }
);

export const selectAsteroidView = createSelector(
  selectComputer,
  (state: ComputerState) => {
    return state.asteroidView;
  }
);

export const selectEngine = createSelector(
  selectComputer,
  (state: ComputerState) => {
    return state.engine
  }
);

export const selectShield = createSelector(
  selectComputer,
  (state: ComputerState) => {
    return state.shield;
  }
)

export const selectLasers = createSelector(
  selectComputer,
  (state: ComputerState) => {
    return state.laser;
  }
);

export const selectDockingClamp = createSelector(
  selectComputer,
  (state: ComputerState) => {
    return state.docking
  }
);

export const selectTractorBeam = createSelector(
  selectComputer,
  (state: ComputerState) => {
    return state.tractorbeam
  }
);

export const selectCourse = createSelector(
  selectComputer,
  (state: ComputerState) => {
    return state.course
  }
);

export const selectViewscreen = createSelector(
    selectComputer,
    selectCurrentNavLocationData,
    selectLaserView,
    selectTractorView,
    (state: ComputerState, currentNavLocation: NavigationData | undefined, laserView: boolean, tractorView: boolean) => {
        const view: ViewscreenState = {
            location: state.location,
            course: state.course,
            leftImage: currentNavLocation?.leftImage,
            centerImage: currentNavLocation?.centerImage,
            rightImage: currentNavLocation?.rightImage,
            laser: laserView,
            tractor: tractorView
        };
        return view;
    }
);
