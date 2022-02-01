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
import { ComputerState, HiddenState } from "./computer.reducer";
import { ViewscreenState } from "./viewscreen/viewscreen.component";

// https://ngrx.io/guide/store/selectors

export const selectViewscreen = createSelector(
    selectComputer,
    (state: ComputerState) => {
        let secret: HiddenState = new HiddenState(state.echoMessages);

        let curr: NavigationData = secret.toNavData(secret.location);
        const view: ViewscreenState = {
            ...curr,
            course: secret.toNavData(secret.course).location,
            laser: secret.laser >= 5,
            tractor: secret.tractor,
        };
        return view;
    }
);

export const selectShields = createSelector(
    selectComputer,
    (state: ComputerState) => {
        let secret: HiddenState = new HiddenState(state.echoMessages);
        return secret.shield;
    }
);

export const selectEngine = createSelector(
    selectComputer,
    (state: ComputerState) => {
        let secret: HiddenState = new HiddenState(state.echoMessages);
        return secret.engine;
    }
);

export const selectLasers = createSelector(
    selectComputer,
    (state: ComputerState) => {
        let secret: HiddenState = new HiddenState(state.echoMessages);
        return secret.laser;
    }
);

export const selectDockingClamp = createSelector(
    selectComputer,
    (state: ComputerState) => {
        let secret: HiddenState = new HiddenState(state.echoMessages);
        return secret.docking;
    }
);

export const selectTractorbeam = createSelector(
    selectComputer,
    (state: ComputerState) => {
        let secret: HiddenState = new HiddenState(state.echoMessages);
        return secret.tractor;
    }
);
