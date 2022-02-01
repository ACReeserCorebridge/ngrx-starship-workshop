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
        let location: SolarSystemLocation = 'LEO';
        let leftImage: string|undefined = undefined;
        let centerImage: string|undefined = undefined;
        let rightImage: string|undefined = undefined;

        if (state.navigationData.length > 0) {
            const navData = state.navigationData.find(x => x.location == state.location);

            if (navData) {
                location = state.location;
                leftImage = navData.leftImage;
                centerImage = navData.centerImage;
                rightImage = navData.rightImage;
            }
        }

        const view: ViewscreenState = {
            location: location,
            course: state.course,
            leftImage: leftImage,
            centerImage: centerImage,
            rightImage: rightImage,
            laser: state.lasers > 0.5,
            tractor: state.tractorbeamEngaged,
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
        return state.lasers
    }
);

export const selectDockingClamp = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return state.docked;
    }
);

export const selectShields = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return state.shields;
    }
);

export const selectTractorbeam = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return state.tractorbeamEngaged
    }
);