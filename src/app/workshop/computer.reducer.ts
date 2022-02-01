/**
 * computer reducer file!
 * 
 * all main computer logic should go in this file
 */
import { createReducer, on } from "@ngrx/store";
import { IExpectations } from "../challenge.service";
import { NavigationData } from "../nav-db.service";
import { command, disengageEngine, echo, loadNavData, loadNavDataSuccess, plotCourse } from "./computer.actions";

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
    echoMessages: string[],
    expectation: Required<IExpectations>,
    navData: NavigationData[],
    //TODO: add a lot more state!
}

export const InitialComputerState: ComputerState = {
    echoMessages: [],
    //TODO: add additional initial state!
    expectation: {
      docking: true,
      engine: 0,
      laser: 0,
      location: 'LEO',
      course: 'LEO',
      shield: 0,
      tractorbeam: false,
      satelliteView: false,
      asteroidView: false,
      laserView: false,
      tractorView: false
    },
    navData: [],
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
    on(loadNavDataSuccess, (state, action) => {
      return {
          ...state,
          navData: action.navs
      };
    }),
    //TODO: use the NavigationData[] to set viewscreen state depending on location and/or course!
    //TODO: add a lot more reducer action logic!
    // https://ngrx.io/guide/store/reducers
    // there should be a lot of logic in here!
    on(command, (state, action) => {
      let location = action.expectation.location ?? state.expectation.location;
      if (action.expectation.engine == 10 && state.expectation.location != state.expectation.course)
        location = state.expectation.course;
      return {
          ...state,
          expectation: {
            shield: action.expectation.shield ?? state.expectation.shield,
            engine: action.expectation.engine ?? state.expectation.engine,
            laser: action.expectation.laser ?? state.expectation.laser,
            laserView: action.expectation.laserView ?? state.expectation.laserView,
            location: location,
            course: action.expectation.course ?? state.expectation.course,
            docking: action.expectation.docking ?? state.expectation.docking,
            tractorbeam: action.expectation.tractorbeam ?? state.expectation.tractorbeam,
            tractorView: action.expectation.tractorView ?? state.expectation.tractorView,
            satelliteView: action.expectation.satelliteView ?? state.expectation.satelliteView,
            asteroidView: action.expectation.asteroidView ?? state.expectation.asteroidView
          },
          echoMessages: [
              action.message,
              ...state.echoMessages
          ]
      };
    }),
    on(plotCourse, (state, action) => {
      let expectation = { ...state.expectation };
      switch(action.directive.adjectivalPhrase) {
        case 'to LEO':
          expectation.course = 'LEO';
          break;
        case 'to Luna orbit':
          expectation.course = 'LunaOrbit';
          expectation.satelliteView = true;
          expectation.asteroidView = false;
          break;
        case 'to the asteroid belt':
          expectation.course = 'AsteroidBelt';
          expectation.satelliteView = false;
          expectation.asteroidView = true;
          expectation.laserView = false;
          break;
      }
      return {
          ...state,
          expectation: expectation,
          echoMessages: [
              action.message,
              ...state.echoMessages
          ]
      };
    }),
    on(disengageEngine, (state, action) => {
      let expectation = { ...state.expectation };
      expectation.location = expectation.course;
      expectation.engine = 0;
      expectation.asteroidView = false;
      return {
          ...state,
          expectation: expectation,
          echoMessages: [
              action.message,
              ...state.echoMessages
          ]
      };
    }),
);

