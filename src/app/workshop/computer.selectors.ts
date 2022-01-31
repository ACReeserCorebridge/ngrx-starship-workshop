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
        const locations: SolarSystemLocation[] = ['LEO', 'LunaOrbit', 'AsteroidBelt'];
        const planets = ['/assets/mars.png', '/assets/SunRed.png', undefined];
        const satellites = ['/assets/red_asteroid.png', '/assets/yellow_satellite.png', undefined];

        const navData = state.navData.find(x => x.location === state.location);

        const view: ViewscreenState = {
            location: navData?.location || 'LEO',
            course: state.course,
            leftImage: navData?.leftImage,
            centerImage: state.asteroidView ? navData?.centerImage : undefined,
            rightImage: navData?.rightImage,
            laser: state.laserView,
            tractor: state.tractorView,
        };
        return view;
    }
);

export const selectEngine = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return state.engine;
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
        return state.docking;
    }
);

export const selectShields = createSelector(
    selectComputer,
    (state: ComputerState) => state.shield
);

export const selectTractorbeam = createSelector(
    selectComputer,
    (state: ComputerState) => state.tractorbeam
);
