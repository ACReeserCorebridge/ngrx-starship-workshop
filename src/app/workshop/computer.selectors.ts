/**
 * computer selector file!
 * 
 * all main computer selectors go in this file
 * 
 * this file should be free of any business logic or Math.random() calls!
 */
import { createSelector } from "@ngrx/store";
import { selectComputer } from "../app.state";
import { ActivateableObjects, ComputerState } from "./computer.reducer";
import { ViewscreenState } from "./viewscreen/viewscreen.component";

// https://ngrx.io/guide/store/selectors

export const selectViewscreen = createSelector(
    selectComputer,
    (state: ComputerState) => {
        const view: ViewscreenState = {
            location: state.location,
            course: state.course,
            leftImage: state.navData?.find(x => x.location===state.location)?.leftImage,            
            centerImage: state.navData?.find(x => x.location===state.location)?.centerImage,            
            rightImage: state.navData?.find(x => x.location===state.location)?.rightImage,
            laser: state.laserPower > 0,
            tractor: state.activateableObject == ActivateableObjects.TractorBeamActive,
        };
        return view;
    }
);

export const selectEngine = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return state.enginePower;
    }
);

export const selectLasers = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return state.laserPower;
    }
);

export const selectDockingClamp = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return state.activateableObject == ActivateableObjects.DockingClampActive;
    }
);

export const selectShields = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return state.shieldPower;
    }
);

export const selectTractorbeam = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return state.activateableObject == ActivateableObjects.TractorBeamActive;
    }
);