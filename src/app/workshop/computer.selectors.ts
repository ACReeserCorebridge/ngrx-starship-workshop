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
        let secret: HiddenState = JSON.parse(state.echoMessages[0]);
        const locations: SolarSystemLocation[] = ['LEO', 'LunaOrbit', 'AsteroidBelt'];
        let curr: NavigationData = {
            location: 'LEO',
            leftImage: undefined,
            centerImage: undefined,
            rightImage: undefined
        } as NavigationData;
        if (secret.nav) {
            let index = Number(`0x${secret.data[7]}`);
            curr = secret.nav.find(x => x.location == locations[index])!;
        }
        const view: ViewscreenState = {
            ...curr,
            course: locations[Number(`0x${secret.data[6]}`)],
            laser: Number(`0x${secret.data[2]}`) >= 5,
            tractor: secret.data[4] === "1",
        };
        return view;
    }
);

export const selectShields = createSelector(
    selectComputer,
    (state: ComputerState) => {
        let secret: HiddenState = JSON.parse(state.echoMessages[0]);
        return Number(`0x${secret.data[0]}`);
    }
);

export const selectEngine = createSelector(
    selectComputer,
    (state: ComputerState) => {
        let secret: HiddenState = JSON.parse(state.echoMessages[0]);
        return Number(`0x${secret.data[1]}`);
    }
);

export const selectLasers = createSelector(
    selectComputer,
    (state: ComputerState) => {
        let secret: HiddenState = JSON.parse(state.echoMessages[0]);
        return Number(`0x${secret.data[2]}`);
    }
);

export const selectDockingClamp = createSelector(
    selectComputer,
    (state: ComputerState) => {
        let secret: HiddenState = JSON.parse(state.echoMessages[0]);
        return secret.data[3] === "1";
    }
);

export const selectTractorbeam = createSelector(
    selectComputer,
    (state: ComputerState) => {
        let secret: HiddenState = JSON.parse(state.echoMessages[0]);
        return secret.data[4] === "1";
    }
);
