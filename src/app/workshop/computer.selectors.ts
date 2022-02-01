/**
 * computer selector file!
 * 
 * all main computer selectors go in this file
 * 
 * this file should be free of any business logic or Math.random() calls!
 */
import { createSelector } from "@ngrx/store";
import { selectComputer } from "../app.state";
import { ComputerState, ShipFeature } from "./computer.reducer";
import { ViewscreenState } from "./viewscreen/viewscreen.component";

// https://ngrx.io/guide/store/selectors

export const selectViewscreen = createSelector(
    selectComputer,
    (state: ComputerState) => {

        const location = state.currentLocation;

        const view: ViewscreenState = {
            location: !state.onCourse ? state.currentLocation?.location : undefined,
            course: state.onCourse ? state.currentLocation?.location : undefined,
            leftImage: location?.leftImage,
            centerImage: (state.onCourse && location?.location != "AsteroidBelt") ? undefined : location?.centerImage,
            rightImage: (state.onCourse && location?.location != "AsteroidBelt") ? undefined : location?.rightImage,
            laser: state.laser > 0,
            tractor: (state.shipFeatures & ShipFeature.TractorOnline) === ShipFeature.TractorOnline,
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

export const selectShields = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return state.shields;
    }
);

export const selectLasers = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return state.laser;
    }
);

export const selectDockingClamp = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return (state.shipFeatures & ShipFeature.DockingOnline) === ShipFeature.DockingOnline;
    }
);

export const selectTractorbeam = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return (state.shipFeatures & ShipFeature.TractorOnline) === ShipFeature.TractorOnline;
    }
);

