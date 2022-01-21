/**
 * computer reducer file!
 *
 * all main computer logic should go in this file
 */
import { createReducer, on } from "@ngrx/store";
import { IComputerDirective, IExpectations, SolarSystemLocation } from "../challenge.service";
import { NavigationData } from "../nav-db.service";
import { ComputerActions } from "./action-types";
import { echo, loadNavDataSuccess } from "./computer.actions";
import { EngineService } from "./services/engine-service";
import { ShieldService } from "./services/shield-service";
import { LaserService } from "./services/laser-service";
import { CourseService } from "./services/course-service";
import { LocationService } from "./services/location-service";
import { MessageService } from "./services/message-service";

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
    echoMessages: string[],
    //TODO: add a lot more state!
    navs: NavigationData[],
    //I don't know if we need all those properties, so we can remove the ones not used by any selector
    docking: boolean,
    engine: number,
    laser: number,
    location: SolarSystemLocation,
    course: SolarSystemLocation,
    shield: number,
    tractorbeam: boolean,
    leftImage: string | undefined,
    centerImage: string | undefined
}

export const InitialComputerState: ComputerState = {
    echoMessages: [],
    //TODO: add additional initial state!
    navs: [],
    docking: true,
    engine: 0,
    laser: 0,
    location: 'LEO',
    course: 'LEO',
    shield: 0,
    tractorbeam: false,
    leftImage: undefined,
    centerImage: undefined
}

export const computerReducer = createReducer<ComputerState>(
    InitialComputerState,
    on(echo, (state, action) => {
        return {
            ...state,
            echoMessages: [
                MessageService.directivesToMessage(action.directives),
                ...state.echoMessages
            ]
        };
    }),
    on(ComputerActions.loadNavDataSuccess, (state, action) => {
        return {
            ...state,
            navs: action.navs
        }
    }),
    on(ComputerActions.switchDockingClamp, (state, action) => {
        return {
            ...state,
            docking: action.enable
        }
    }),
    on(ComputerActions.switchTractorBeam, (state, action) => {
        return {
            ...state,
            tractorbeam: action.enable,
            leftImage: action.enable == false && state.course == 'LunaOrbit' ? undefined : state.leftImage
        }
    }),
    on(ComputerActions.changeEngine, (state, action) => {
        return {
            ...state,
            engine: EngineService.ChangeEngineBasedOnDirective(action.directive, state.engine),
            location: LocationService.DefineLocationBasedOnEngineDirectives(action.directive, state.course, state.location)
        }
    }),
    on(ComputerActions.changeShields, (state, action) => {
        return {
          ...state,
          shield: ShieldService.ChangeShieldBasedOnDirective(action.directive, state.shield),
          laser: LaserService.ChangeLaserBasedOnShield(action.directive, state.laser)
        }
    }),
    on(ComputerActions.changeLaser, (state, action) => {
      let newLaserState = LaserService.ChangeLaserBasedOnDirective(action.directive, state.laser);
        return {
          ...state,
          laser: newLaserState,
          centerImage: newLaserState > 0 && state.course == "AsteroidBelt" ? undefined : state.centerImage
        }
    }),
    on(ComputerActions.changeCourse, (state, action) => {
          let newCourse = CourseService.ChangeCourseBasedOnDirective(action.directive, state.course);
          let navCourseData = state.navs.find(nav => nav.location == newCourse);
          return {
              ...state,
              course: newCourse,
              leftImage: navCourseData?.leftImage,
              centerImage: navCourseData?.centerImage
          }
    })
);

