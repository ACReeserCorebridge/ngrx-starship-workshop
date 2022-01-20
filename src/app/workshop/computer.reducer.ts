/**
 * computer reducer file!
 *
 * all main computer logic should go in this file
 */
import { createReducer, on } from "@ngrx/store";
import { SolarSystemLocation } from "../challenge.service";
import { NavigationData } from "../nav-db.service";
import { echo, loadNavDataSuccess, disengageDock, disengageEngines, disengageLasers, disengageShields, disengageTractorBeam, engageDock, engageEngines, engageLasers, engageShields, engageTractorBeam, loadNavData, plotCourse } from "./computer.actions";

/**
 * This is the "slice" that you need to fill out!
 *
 * Course data, location data, engine/shield/laser power level, all
 * of these state properties must reside in this interface!
 *
 * All of the visual components will select their state from this central
 * state location.
 */
export interface ComputerState{
    /**
     * these messages are displayed by the computer-messages component
     *
     * they are not required or useful, they are just example of state properties
     *
     * feel free to change or remove this
     */
    echoMessages: string[]

    shield?:number,
    engine?:number,
    laser?:number,
    location?:SolarSystemLocation,
    course?:SolarSystemLocation,
    docking?:boolean,
    tractorbeam?:boolean,
    satelliteView?:boolean,
    asteroidView?: boolean,
    tractorView?:boolean,
    laserView?:boolean,
    navs: NavigationData[]
}

export const InitialComputerState: ComputerState = {
    echoMessages: [],
    shield: 0,
    engine: 0,
    laser: 0,
    location: 'LEO',
    course: 'LEO',
    docking: true,
    tractorbeam: false,
    satelliteView: false,
    asteroidView: false,
    tractorView: false,
    laserView: false,
    navs: []
}

export const computerReducer = createReducer<ComputerState>(
    InitialComputerState,
    on(echo, (state, action) => {
        return {
            ...state,
            echoMessages: [
                action.message,
                ...state.echoMessages
            ]
        };
    }),
    //TODO: add an on() listener for loadNavDataSuccess that puts NavigationData[] in the state!
    //TODO: use the NavigationData[] to set viewscreen state depending on location and/or course!
    on(loadNavDataSuccess, (state, action) => {
      let res = {
        ...state,
      };
      res.navs = res.navs.concat(action.navs);
      return res;
    }),

    on(engageShields, (state, action) => {
      let res = {
        ...state,
        shield: action.power
      };

      if (action.power == 10) {
        res.laserView = false;
        res.laser = 0;
        res.engine = 0;
      }

      return res;
    }),

    on(disengageShields, (state, action) => {
      return {
          ...state,
          shield: action.power
      };
    }),

    on(engageEngines, (state, action) => {
      let res = {
        ...state,
        engine: action.power
      };
      if (action.power == 10) {
        res.laserView = false;
        res.laser = 0;
        res.shield = 0;
      }
      if (action.power >= 5) {
        res.location = state.course;
      }
      return res;
    }),

    on(disengageEngines, (state, action) => {
      return {
        ...state,
        engine: action.power,
        location: state.course
      };
    }),

    on(engageLasers, (state, action) => {
      let res = {
        ...state,
        laser: action.power,
        laserView: true,
        asteroidView: false,
        navs: state.navs.map(nav => ({...nav})) // 2
                        .map(nav => { // 3
                            if (nav.location == "AsteroidBelt") {
                              return {
                                ...nav,
                                centerImage: '',
                              }
                            } else {
                              return nav;
                            }
                        })
      };
      if (action.power == 10) {
        res.engine = 0;
        res.shield = 0;
      }
      return res;
    }),

    on(disengageLasers, (state, action) => {
      return {
          ...state,
          laser: action.power,
          laserView: false
      };
    }),

    on(engageDock, (state, action) => {
      return {
          ...state,
          docking: true
      };
    }),

    on(disengageDock, (state, action) => {
      return {
          ...state,
          docking: false
      };
    }),

    on(engageTractorBeam, (state, action) => {
      return {
          ...state,
          tractorbeam: true,
          tractorView: true
      };
    }),

    on(disengageTractorBeam, (state, action) => {
      return {
        ...state,
        tractorbeam: false,
        tractorView: false,
        satelliteView: false,
        navs: state.navs.map(nav => ({...nav})) // 2
                        .map(nav => { // 3
                            if (nav.location == "LunaOrbit") {
                              return {
                                ...nav,
                                leftImage: '',
                              }
                            } else {
                              return nav;
                            }
                        })
      };
    }),

    on(plotCourse, (state, action) => {
      let res = {
        ...state,
        course: action.goto
      };
      res.satelliteView = false;
      res.asteroidView = false;
      switch(action.goto) {
        case "LunaOrbit":
          res.satelliteView = true;
          break;
        case "AsteroidBelt":
          res.asteroidView = true;
          break;
        case "LEO":
          // res.satelliteView = true;
          break;
      }
      return res;
    }),
    // https://ngrx.io/guide/store/reducers
    // there should be a lot of logic in here!
);

