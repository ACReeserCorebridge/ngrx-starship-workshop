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
            location: state.location,
            course: state.course,
            leftImage: state.leftImage,
            centerImage: state.centerImage,
            rightImage: state.rightImage,
            laser: 0,//state.laser,
            tractor: state.tractor,
            laserView: state.laserView,
            satelliteView: state.satelliteView,
            docking: state.docking
        };
        return view;
    }
);

export const selectEngine = createSelector(
    selectComputer,
    (state: ComputerState) => {
        //TODO: remove all the random state!
        return state.engine;
    }
);

export const selectLasers = createSelector(
    selectComputer,
    (state: ComputerState) => {
        //TODO: remove all the random state!
        return state.laser;
    }
);

export const selectDockingClamp = createSelector(
    selectComputer,
    (state: ComputerState) => {
        //TODO: remove all the random state!
        return state.dockingClamp;
    }
);

export const selectShields = createSelector(
    selectComputer,
    (state: ComputerState) => {
        //TODO: remove all the random state!
        return state.shield;
    }
);

export const selectTractorbeam = createSelector(
    selectComputer,
    (state: ComputerState) => {
        //TODO: remove all the random state!
        return state.tractorbeam;
    }
);

export const selectTractorView = createSelector(
    selectComputer,
    (state: ComputerState) => {
        //TODO: remove all the random state!
        return state.tractor;
    }
);

export const selectCourse = createSelector(
    selectComputer,
    (state: ComputerState) => {
        //TODO: remove all the random state!
        return state.course;
    }
);

export const selectSatelliteView = createSelector(
    selectComputer,
    (state: ComputerState) => {
        //TODO: remove all the random state!
        return state.satelliteView;
    }
);