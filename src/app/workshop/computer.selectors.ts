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
        let nav = state.navigationData.find(x => x.location == state.location);
        const view: ViewscreenState = {
            location: locations[locations.indexOf(<SolarSystemLocation>state.location)],
            course: locations[locations.indexOf(<SolarSystemLocation>state.course)],
            leftImage:  nav?.leftImage,
            centerImage: nav?.centerImage,
            rightImage: nav?.rightImage,
            laser: <boolean>state.laserView,
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
    (state: ComputerState) => state.docking
);

//TODO: finish up the shield selector!
 export const selectShields = createSelector(
     selectComputer,
     (state:ComputerState) => state.shield
);

//TODO: finish up the tractorbeam selector!
export const selectTractorbeam = createSelector(
     selectComputer,
     (state:ComputerState) => state.tractorbeam
);