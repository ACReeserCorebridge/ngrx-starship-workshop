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
        //TODO: remove all the random state!
        const navigationData: NavigationData | undefined = state.navs.find(nav => nav.location === state.course);
        const view: ViewscreenState = {
            location: state.course,
            course: state.course,
            leftImage: state.tractorbeam ? navigationData?.leftImage : undefined,
            centerImage: state.engine > 0 ? navigationData?.centerImage : undefined,
            rightImage: navigationData?.rightImage,
            laser: state.laser === 5,
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
    (state: ComputerState) => state.engine === 0
);

//TODO: finish up the shield selector!
export const selectShields = createSelector(
    selectComputer,
    (state: ComputerState) => state.shield
);

// TODO: finish up the tractorbeam selector!
export const selectTractorbeam = createSelector(
    selectComputer,
    (state: ComputerState) => state.tractorbeam
);