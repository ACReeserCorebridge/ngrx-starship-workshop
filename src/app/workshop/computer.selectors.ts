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
        //TODO: remove all the random state!
        let nav = state.navData.find(x => x.location == state.expectation.course)
        const view: ViewscreenState = {
            location: state.expectation.location,
            course: state.expectation.course,
            leftImage: (nav?.leftImage?.includes('satellite') && state.expectation.satelliteView == false) ? undefined : nav?.leftImage,
            centerImage: (nav?.leftImage?.includes('asteroid') && state.expectation.asteroidView == false) ? undefined : nav?.centerImage,
            rightImage: nav?.rightImage,
            laser: state.expectation.laserView,
            tractor: state.expectation.tractorView,
        };
        return view;
    }
);

export const selectEngine = createSelector(
    selectComputer,
    (state: ComputerState) => {
        //TODO: remove all the random state!
        return state.expectation.engine
    }
);

export const selectLasers = createSelector(
    selectComputer,
    (state: ComputerState) => {
        //TODO: remove all the random state!
        return state.expectation.laser
    }
);

export const selectDockingClamp = createSelector(
    selectComputer,
    (state: ComputerState) => {
        //TODO: remove all the random state!
        return state.expectation.docking
    }
);

//TODO: finish up the shield selector!
export const selectShields = createSelector(
    selectComputer,
    (state: ComputerState) => {
        //TODO: remove all the random state!
        return state.expectation.shield
    }
);

//TODO: finish up the tractorbeam selector!
export const selectTractorbeam = createSelector(
    selectComputer,
    (state: ComputerState) => {
        //TODO: remove all the random state!
        return state.expectation.tractorbeam
    }
);
