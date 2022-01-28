/**
 * computer reducer file!
 *
 * all main computer logic should go in this file
 */
import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { SolarSystemLocation } from "../challenge.service";
import { NavigationData } from "../nav-db.service";
import { course, echo, loadNavDataSuccess, power, toggle } from "./computer.actions";

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
    //TODO: add a lot more state!
    docking: boolean,
    tractorbeam: boolean,
    shield: number,
    engine: number,
    laser: number,
    course: SolarSystemLocation,
    location: SolarSystemLocation,
    leftImage: string | undefined,
    centerImage: string | undefined,
    rightImage: string | undefined,
    asteroidView: boolean,
    laserView: boolean,
    tractorView: boolean
    navData: NavigationData[]
}

export const InitialComputerState: ComputerState = {
    echoMessages: [],

    leftImage: undefined,
    centerImage: undefined,
    rightImage: undefined,

    docking: true,
    engine: 0,
    laser: 0,
    location: 'LEO',
    course: 'LEO',
    shield: 0,
    tractorbeam: false,
    asteroidView: false,
    laserView: false,
    tractorView: false,

    navData: []
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
    on(loadNavDataSuccess, (state, action) => {
      const navForCurrentLoc = (action.navs || []).find(nav => nav.location === state.location);

      if (navForCurrentLoc) {
        return {
          ...state,
          leftImage: navForCurrentLoc.leftImage || undefined,
          centerImage: navForCurrentLoc.centerImage || undefined,
          rightImage: navForCurrentLoc.rightImage || undefined,
          navData: action.navs
        }
      }

      return state;
    }),
    on(toggle, (state, action) => {
      const directive = action.directive;
      let clamped: boolean = state.docking;
      let beam: boolean = state.tractorbeam;
      let leftImage: string | undefined = state.leftImage;
      let engage: boolean = directive.verb === 'engage';


      if (directive.directObject === 'docking clamp') clamped = engage;
      if (directive.directObject === 'tractorbeam') {
        beam = engage;

        if (!beam) {
          leftImage = undefined
        }
      }

      return {
        ...state,
        docking: clamped,
        tractorbeam: beam,
        leftImage: leftImage
      }
    }),
    on(course, (state, action) => {
      const directive = action.directive;
      let course: SolarSystemLocation = state.course;

      if (directive.adjectivalPhrase === 'to LEO') course = 'LEO';
      if (directive.adjectivalPhrase === 'to Luna orbit') course = 'LunaOrbit';
      if (directive.adjectivalPhrase === 'to the asteroid belt') course = 'AsteroidBelt';

      return {
        ...state,
        course: course
      }
    }),
    on(power, (state, action) => {
      const directive = action.directive;
      let power: number = 0;
      let engine: number = state.engine;
      let shield: number = state.shield;
      let laser: number = state.laser;
      let location: SolarSystemLocation = state.location;
      let leftImage: string | undefined = state.leftImage;
      let centerImage: string | undefined = state.centerImage;

      if (directive.verb === 'engage') {
        if (!directive.adverb) power = 0;
        else if (directive.adverb === 'fully') power = 10;
        else if (directive.adverb === 'halfway') power = 5;
        else if (directive.adverb === 'slowly') power = 1;
      }

      if (directive.verb === 'disengage') {
        power = 0;
        if (directive.directObject === 'engines') location = state.course;
      }

      if (directive.directObject === 'engines') {
        engine = power;
        if (state.course === 'LunaOrbit' && engine === 10) {
          const navForCourse = (state.navData || []).find(nav => nav.location === state.course);
          leftImage = navForCourse?.leftImage;
        }

        if (state.shield === 5 && engine === 5) {
          const navForCourse = (state.navData || []).find(nav => nav.location === state.course);
          centerImage = navForCourse?.centerImage;
        }

        if (state.course === 'LEO' && engine === 10) {
          location = state.course;
        }
      }

      if (directive.directObject === 'laser') {
        laser = power;

        if (laser === 5 && state.engine === 0) centerImage = undefined;
      }

      if (directive.directObject === 'shields') {
        shield = power;

        if (shield === 10) {
          laser = 0;
        }
      }



      return {
        ...state,
        engine: engine,
        shield: shield,
        laser: laser,
        location: location,
        leftImage: leftImage,
        centerImage: centerImage,
      };
    })
);

