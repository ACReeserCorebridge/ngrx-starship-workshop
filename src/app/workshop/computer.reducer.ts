/**
 * computer reducer file!
 *
 * all main computer logic should go in this file
 */
import { createReducer, on } from "@ngrx/store";
import { NavigationData } from "../nav-db.service";
import { echo, toggleTractorBeam, activateShield, loadNavDataSuccess, toggleDocking, activateLaser, activateEngine } from "./computer.actions";

/**
 * This is the "slice" that you need to fill out!
 *
 * Course data, location data, engine/shield/laser power level, all
 * of these state properties must reside in this interface!
 *
 * All of the visual components will select their state from this central
 * state location.
 */
export interface ComputerState {
  /**
   * these messages are displayed by the computer-messages component
   *
   * they are not required or useful, they are just example of state properties
   *
   * feel free to change or remove this
   */
  echoMessages: string[]
  tractorBeamEnabled: boolean,
  armour: number
  navigationData: NavigationData[],
  engaged: boolean,
  laserIntesity: number,
  speed: number
}

export const InitialComputerState: ComputerState = {
  echoMessages: [],
  navigationData: [{
    location: 'LEO',
    leftImage: '/assets/satellite.png',
    centerImage: '/assets/planet.png',
    rightImage: '/assets/spaceStation.png'
  }],
  tractorBeamEnabled: false,
  armour: 0,
  engaged: false,
  laserIntesity: 0,
  speed: 0,
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

  on(toggleTractorBeam, (state, action) => {
    var returnValue = { ...state, tractorBeamEnabled: action.status };
    if (action.navs) {
      if (action.navs && action.navs.length > 0) {
        returnValue.navigationData = action.navs;
      }
    }
    return returnValue;
  }),

  on(activateShield, (state, action) => {
    var returnValue = { ...state, laserIntesity: 0, armour: action.armour };
    if (action.navs && action.navs.length > 0) {
      returnValue.navigationData = action.navs;
    }
    return returnValue;
  }),

  on(loadNavDataSuccess, (state, action) => {

    var returnValue = { ...state, navigationData: action.navs };
    if (action.armour) {
      returnValue.armour = action.armour;
    }
    return returnValue;
  }),

  on(toggleDocking, (state, action) => {
    return {
      ...state,
      engaged: action.engaged
    };
  }),

  on(activateLaser, (state, action) => {
    var returnValue = { ...state, laserIntesity: action.intensity }
    if (action.navs && action.navs.length > 0) {
      returnValue.navigationData = action.navs;
    }
    return returnValue;
  }),

  on(activateEngine, (state, action) => {
    var returnValue = { ...state, speed: action.speed };
    if (action.navs && action.navs.length > 0) {
      returnValue.navigationData = action.navs;
    }
    return returnValue;
  }),

  //TODO: add an on() listener for loadNavDataSuccess that puts NavigationData[] in the state!
  //TODO: use the NavigationData[] to set viewscreen state depending on location and/or course!
  //TODO: add a lot more reducer action logic!
  // https://ngrx.io/guide/store/reducers
  // there should be a lot of logic in here!
);

