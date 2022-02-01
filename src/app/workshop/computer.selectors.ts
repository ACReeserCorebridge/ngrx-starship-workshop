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
        let navData = state.navData.find(x => x.location == state.location);

        const view: ViewscreenState = {
            location: state.location as SolarSystemLocation,
            course: state.course,
            leftImage: navData?.leftImage,
            centerImage: navData?.centerImage,
            rightImage: navData?.rightImage,
            laser: !!state.laserView,
            tractor: !!state.tractorView,
        };
        return view;
    }
);

export const selectEngine = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return state.engine || 0;
    }
);

export const selectLasers = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return state.laser || 0;
    }
);

export const selectDockingClamp = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return state.docking || false;
    }
);

export const selectShields = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return state.shield || 0
    }
);

export const selectTractorbeam = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return !!state.tractorbeam;
    }
);