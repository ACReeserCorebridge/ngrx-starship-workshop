/**
 * computer reducer file!
 * 
 * all main computer logic should go in this file
 */
 import { createReducer, on } from "@ngrx/store";
 import { IComputerDirective, IExpectations, SolarSystemLocation } from "../challenge.service";
 import { NavigationData } from "../nav-db.service";
 import { echo, engines, plotCourse, dockingClamp,  laserPower, loadNavDataSuccess, shields, tractorbeam } from "./computer.actions";
 import { DISENGAGE, ENGAGE, MAX_AMT_POWER, MIN_AMT_POWER, processComputerDirectives } from "./computer.service";
 import { ViewscreenState } from "./viewscreen/viewscreen.component";
 
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
     echoMessages: string[];
     expectationState: IExpectations;
     viewScreenState: ViewscreenState;
     navigationData: NavigationData[];
     //TODO: add a lot more state!
 }
 
 export const InitialComputerState: ComputerState = {
     echoMessages: [],
     expectationState: {
        tractorbeam: false,
        satelliteView: false,
        asteroidView: false,
        course: 'LEO',
        docking: false,
        engine: 0,
        laser: 0,
        laserView: false,
        location: 'LEO',
        shield: 0,
        tractorView: false,
     },
     navigationData: [],
     viewScreenState: {
        rightImage: undefined,
        centerImage: undefined,
        laser: false,
        leftImage: undefined,
        location: 'LEO',
        tractor: false,
        course: undefined
     }
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
     on(engines, (state, action) => {
         let power = action.directive.verb === ENGAGE ? processComputerDirectives(action.directive) : 0;
         return {
             ...state,
             expectationState: {
                 ...state.expectationState,
                 laser: power >= MAX_AMT_POWER ? 0 : state.expectationState.laser,
                 shield: power >= MAX_AMT_POWER ? 0 : state.expectationState.shield,
                 asteroidView: power > MIN_AMT_POWER,
                 engine: power,
             },
             viewScreenState: {
                 ...state.viewScreenState,
                 centerImage: action.directive.verb === DISENGAGE ? undefined : state.viewScreenState.centerImage
             }
         };
     }),
     on(plotCourse, (state, action) => {
         let viewScreenState: ViewscreenState = InitialComputerState.viewScreenState;
         const screenState = processComputerDirectives(action.directive);
         const navData= state.navigationData.find(d => d.location === screenState);
         if (navData != null) {
             viewScreenState = {
                 centerImage: navData.centerImage,
                 laser: state.expectationState.laserView || false,
                 leftImage: navData.leftImage,
                 location: navData.location,
                 rightImage: navData.rightImage,
                 tractor: screenState === 'LunaOrbit',
                 course: screenState
             };
         }
         return {
             ...state,
             expectationState: {
                 ...state.expectationState,
                 course: screenState,
             },
             viewScreenState
         };
     }),
     on(shields, (state, action) => {
         let power = action.directive.verb === ENGAGE ? processComputerDirectives(action.directive) : 0;
         return {
             ...state,
             expectationState: {
                 ...state.expectationState,
                 shield: power,
                 engine: power >= MAX_AMT_POWER ? 0 : state.expectationState.engine,
                 laser: power >= MAX_AMT_POWER ? 0 : state.expectationState.laser,
             },
             viewScreenState: {
                 ...state.viewScreenState,
                 leftImage: power >= MAX_AMT_POWER ? undefined : state.viewScreenState.leftImage,
                 laser: power >= MAX_AMT_POWER ? false : state.viewScreenState.laser,
                 centerImage: power >= MAX_AMT_POWER ? undefined : state.viewScreenState.centerImage,
             }
         };
     }),
     on(laserPower, (state, action) => {
         let power = action.directive.verb === ENGAGE ? processComputerDirectives(action.directive) : 0;
         return {
             ...state,
             expectationState: {
                 ...state.expectationState,
                 laser: power,
                 shield: power >= MAX_AMT_POWER ? 0 : state.expectationState.shield,
                 engine: power >= MAX_AMT_POWER ? 0 : state.expectationState.engine,
                 laserView: power > MIN_AMT_POWER
             },
             viewScreenState: {
                 ...state.viewScreenState,
                 laser: power > MIN_AMT_POWER
             }
         };
     }),
     on(dockingClamp, (state, action) => {
         let isDocking = (action.directive.verb === ENGAGE );
         return {
             ...state,
             expectationState: {
                 ...state.expectationState,
                 docking: isDocking,
             }
         };
     }),
     on(tractorbeam, (state, action) => {
        let isTractorbeam = (action.directive.verb === ENGAGE );
         return {
             ...state,
             expectationState: {
                 ...state.expectationState,
                 tractorbeam: isTractorbeam,
                 satelliteView: action.directive.verb === DISENGAGE ? false : state.expectationState.satelliteView,
                 tractorView: isTractorbeam
             },
             viewScreenState: {
                 ...state.viewScreenState,
                 tractor: isTractorbeam,
                 leftImage: action.directive.verb === DISENGAGE ? undefined : state.viewScreenState.leftImage
             }
         };
     }),
     on(loadNavDataSuccess, (state, action) => {
         return {
             ...state,
             navigationData: action.navs
         };
     })
 );

