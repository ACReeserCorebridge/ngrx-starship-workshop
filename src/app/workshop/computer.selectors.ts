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
        const satellites = ['/assets/red_asteroid.png', '/assets/yellow_satellite.png', undefined, '/assets/satellite.png'];
        const currentlocation: SolarSystemLocation |undefined = locations.find(x => x == state.location);

        const view: ViewscreenState = {
            location: currentlocation ? currentlocation : 'LEO',
            course: currentlocation,
            leftImage: state.leftImage,
            centerImage: state.centerImage,
            rightImage: state.rightImage,
            laser: state.laser,
            tractor: state.tractor,
        };
        return view;
    }
);


export const selectEngine = createSelector(
    selectComputer,
    (state: ComputerState) => {
        //TODO: remove all the random state!
        return state.enginePower
    }
);

export const selectLasers = createSelector(
    selectComputer,
    (state: ComputerState) => {
        //TODO: remove all the random state!
        return state.laserPower
    }
);

export const selectDockingClamp = createSelector(
    selectComputer,
    (state: ComputerState) => {
        //TODO: remove all the random state!
        return state.isDockingClampReady
    }
);


//TODO: finish up the shield selector!
export const selectShields = createSelector(
    selectComputer,
    (state: ComputerState) => state.shieldHealth
);

//TODO: finish up the tractorbeam selector!
export const selectTractorbeam = createSelector(
    selectComputer,
    (state: ComputerState) => state.tractorView
);