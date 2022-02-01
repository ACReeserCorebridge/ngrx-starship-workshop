/**
 * computer reducer file!
 * 
 * all main computer logic should go in this file
 */
import { act } from "@ngrx/effects";
import { createReducer, on } from "@ngrx/store";
import { SolarSystemLocation } from "../challenge.service";
import { NavigationData } from "../nav-db.service";
import { adjustDockingClamp, adjustEngines, adjustLasers, adjustShields, adjustTractorBeam, echo, loadNavDataError, loadNavDataSuccess, plotCourse } from "./computer.actions";

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
    navigationData: NavigationData[];
    echoMessages: string[];
    tractorbeamEngaged: boolean;
    shields: number;
    docked: boolean;
    engines: number;
    lasers: number;
    location: SolarSystemLocation;
    course: SolarSystemLocation|undefined;
}

export const InitialComputerState: ComputerState = {
    navigationData: [],
    echoMessages: [],
    tractorbeamEngaged: false,
    shields: 0,
    docked: false,
    engines: 0,
    lasers: 0,
    location: 'LEO',
    course: undefined
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
        return {
            ...state,
            navigationData: action.navs
        }
    }),
    
    on(adjustEngines, (state, action) => {
        let course = state.course;
        let location = state.location;

        if (course) {
            location = course;
            if (action.level == 0) 
                course = undefined;
        }

        return {
            ...state,
            engines : action.level,
            lasers: 0,
            location: location,
            course: course
        }
    }),

    on(adjustLasers, (state, action) => {
        let navData = [...state.navigationData];

        if (action.level > 0.5) {
            const index = navData.findIndex(x => x.location == state.location);
            let leftImage = navData[index].leftImage;
            if (leftImage?.includes("asteroid"))
                leftImage = undefined;

            let centerImage = navData[index].centerImage;
            if (centerImage?.includes("asteroid"))
                centerImage = undefined;

            let rightImage = navData[index].rightImage;
            if (rightImage?.includes("asteroid"))
                rightImage = undefined;

            navData[index] = 
            {
                location: state.location,
                leftImage: leftImage,
                centerImage: centerImage,
                rightImage: rightImage
            }
        }

        return {
            ...state,
            navigationData: navData,
            lasers : action.level
        }
    }),

    on(plotCourse, (state, action) => {
        return {
            ...state,
            course : action.location,
            lasers: 0
        }
    }),

    on(adjustDockingClamp, (state, action) => {
        return {
            ...state,
            docked : action.docking,
            lasers: 0
        }
    }),

    on(adjustShields, (state, action) => {
        return {
            ...state,
            shields: action.level,
            lasers: 0
        };
    }),

    on(adjustTractorBeam, (state, action) => {
        let navData = [...state.navigationData];

        if (!action.engaged) {
            const index = navData.findIndex(x => x.location == state.location);
            let leftImage = navData[index].leftImage;
            if (leftImage?.includes("satellite"))
                leftImage = undefined;

            let centerImage = navData[index].centerImage;
            if (centerImage?.includes("satellite"))
                centerImage = undefined;

            let rightImage = navData[index].rightImage;
            if (rightImage?.includes("satellite"))
                rightImage = undefined;

            navData[index] = 
            {
                location: state.location,
                leftImage: leftImage,
                centerImage: centerImage,
                rightImage: rightImage
            }
        }

        return {
            ...state,
            navigationData: navData,
            tractorbeamEngaged: action.engaged,
            lasers: 0
        };
    }),
);