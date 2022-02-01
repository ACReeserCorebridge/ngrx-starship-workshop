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
import { NavigationData } from "../nav-db.service";
import { ComputerState } from "./computer.reducer";
import { ViewscreenState } from "./viewscreen/viewscreen.component";

// https://ngrx.io/guide/store/selectors

export const selectViewscreen = createSelector(
    selectComputer,
    (state: ComputerState) => {
        const view: ViewscreenState = {
            location: state.location,
            course: state.course,
            leftImage: state.navigationData[state.location]['leftImage'],
            centerImage: state.navigationData[state.location]['centerImage'],
            rightImage: state.navigationData[state.location]['rightImage'],
            laser: state.engagedItem == 'lasers',
            tractor: state.engagedItem == 'tractorbeam',
        };
        return view;
    }
);

export const selectEngine = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return state.engines;
    }
);

export const selectLasers = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return state.engagedItem == 'lasers' ? state.engagedItemValue : 0;
    }
);

export const selectDockingClamp = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return state.engagedItem == 'docked';
    }
);

export const selectShields = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return state.engagedItem == 'shields' ? state.engagedItemValue : 0;
    }
);

export const selectTractorbeam = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return state.engagedItem == 'tractorbeam'
    }
);