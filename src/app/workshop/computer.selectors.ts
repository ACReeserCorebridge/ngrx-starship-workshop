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
        const planets = ['/assets/planet.png', '/assets/luna.png', '/assets/asteroid.png'];
        const satellites = ['/assets/red_asteroid.png', '/assets/yellow_satellite.png', undefined];
        const view: ViewscreenState = {
            location: locations[Number(`0x${state.state[7]}`)],
            course: locations[Number(`0x${state.state[6]}`)],
            leftImage: satellites[Math.floor(Math.random() * 3)],
            centerImage: planets[Math.floor(Math.random() * 3)],
            rightImage: satellites[Math.floor(Math.random() * 3)],
            laser: Number(`0x${state.state[2]}`) >= 5,
            tractor: state.state[4] === "1",
        };
        return view;
    }
);

export const selectShields = createSelector(
  selectComputer,
  (state: ComputerState) => {
      return Number(`0x${state.state[0]}`);
  }
);

export const selectEngine = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return Number(`0x${state.state[1]}`);
    }
);

export const selectLasers = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return Number(`0x${state.state[2]}`);
    }
);

export const selectDockingClamp = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return state.state[3] === "1";
    }
);

export const selectTractorbeam = createSelector(
  selectComputer,
  (state: ComputerState) => {
        return state.state[4] === "1";
  }
);
