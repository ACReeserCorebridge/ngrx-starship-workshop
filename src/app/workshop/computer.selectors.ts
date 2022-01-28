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
        const locations: SolarSystemLocation[] = ['LEO', 'LunaOrbit', 'AsteroidBelt'];
        const planets = ['/assets/mars.png', '/assets/SunRed.png', undefined];
        const satellites = ['/assets/red_asteroid.png', '/assets/yellow_satellite.png', undefined];
        const view: ViewscreenState = {
            location: state.viewScreenState.location,
            course: state.viewScreenState.course,
            leftImage: state.viewScreenState.leftImage,
            centerImage: state.viewScreenState.centerImage,
            rightImage: state.viewScreenState.rightImage,
            laser: state.viewScreenState.laser,
            tractor: state.viewScreenState.tractor,
        };
        return view;
    }
);

export const selectEngine = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return state.enginePower
    }
);

export const selectLasers = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return state.laserPower
    }
);

export const selectDockingClamp = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return state.docking
    }
);

export const selectShield = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return state.shieldPower
    }
);

export const selectTrackingBeam = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return state.tractorbeam
    }
);

