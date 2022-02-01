/**
 * computer reducer file!
 * 
 * all main computer logic should go in this file
 */
import { act } from "@ngrx/effects";
import { createReducer, on } from "@ngrx/store";
import { SolarSystemLocation } from "../challenge.service";
import { adjustState, echo, loadNavDataSuccess } from "./computer.actions";

type imageArray = { [index in string]: string|undefined};
type locationArray = { [index in SolarSystemLocation]: imageArray };
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
    navigationData: locationArray;
    echoMessages: string[];
    engines: number;
    location: SolarSystemLocation;
    course: SolarSystemLocation|undefined;

    engagedItem: 'none' | 'docked' | 'tractorbeam' | 'lasers' | 'shields';
    engagedItemValue: number;
}

export const InitialComputerState: ComputerState = {
    navigationData: {
        AsteroidBelt: {},
        LEO: {},
        LunaOrbit: {},
    },
    echoMessages: [],
    engines: 0,
    location: 'LEO',
    course: undefined,

    engagedItem: 'none',
    engagedItemValue: 0,
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
        const leo = action.navs.find(x => x.location == 'LEO');
        let leoNavData: imageArray = {}; 
        if (leo?.leftImage) {
            leoNavData['leftImage'] = leo.leftImage;
        }
        if (leo?.centerImage) {
            leoNavData['centerImage'] = leo.centerImage;
        }
        if (leo?.rightImage) {
            leoNavData['rightImage'] = leo.rightImage;
        }

        const lunaorbit = action.navs.find(x => x.location == 'LunaOrbit');
        let lunaorbitNavData: imageArray = {}; 
        if (lunaorbit?.leftImage) {
            lunaorbitNavData['leftImage'] = lunaorbit.leftImage;
        }
        if (lunaorbit?.centerImage) {
            lunaorbitNavData['centerImage'] = lunaorbit.centerImage;
        }
        if (lunaorbit?.rightImage) {
            lunaorbitNavData['rightImage'] = lunaorbit.rightImage;
        }

        const asteroidbelt = action.navs.find(x => x.location == 'AsteroidBelt');
        let asteroidbeltNavData: imageArray = {}; 
        if (asteroidbelt?.leftImage) {
            asteroidbeltNavData['leftImage'] = asteroidbelt.leftImage;
        }
        if (asteroidbelt?.centerImage) {
            asteroidbeltNavData['centerImage'] = asteroidbelt.centerImage;
        }
        if (asteroidbelt?.rightImage) {
            asteroidbeltNavData['rightImage'] = asteroidbelt.rightImage;
        }

        return {
            ...state,
            navigationData: {
                LEO: leoNavData,
                LunaOrbit: lunaorbitNavData,
                AsteroidBelt: asteroidbeltNavData
            }
        }
    }),

    on(adjustState, (state, action) => {
        let newState = {...state};
        let navData = {...state.navigationData};

        if (action.lasers != undefined) {
            if (action.lasers > 0.5) {
                let leftImage = navData[state.location]['leftImage'];
                if (leftImage?.includes("asteroid")) {
                    delete navData[state.location]['leftImage'];
                }
    
                let centerImage = navData[state.location]['centerImage'];
                if (centerImage?.includes("asteroid")) {
                    delete navData[state.location]['centerImage'];
                }
    
                let rightImage = navData[state.location]['rightImage'];
                if (rightImage?.includes("asteroid")) {
                    delete navData[state.location]['rightImage'];
                }
            }

            newState.engagedItem = 'lasers';
            newState.engagedItemValue = action.lasers;
    
        } else {
            newState.engagedItem = 'none';
            newState.engagedItemValue = 0;
        }

        if (action.course != undefined) {
            newState.course = action.course;
        }

        if (action.engines != undefined) {
            let course = newState.course;
            let location = state.location;
    
            if (course) {
                location = course;
                if (action.engines == 0) 
                    course = undefined;
            }

            newState.engines = action.engines;
            newState.location = location,
            newState.course = course            
        }

        if (action.docking) {
            newState.engagedItem = 'docked';
        }

        if (action.shields != undefined) {
            newState.engagedItem = 'shields';
            newState.engagedItemValue = action.shields;
        }

        if (action.tractorbeamEngaged != undefined) {
            if (!action.tractorbeamEngaged) {
                let leftImage = navData[state.location]['leftImage'];
                if (leftImage?.includes("satellite")) {
                    delete navData[state.location]['leftImage'];
                }
    
                let centerImage = navData[state.location]['centerImage'];
                if (centerImage?.includes("satellite")) {
                    delete navData[state.location]['centerImage'];
                }
    
                let rightImage = navData[state.location]['rightImage'];
                if (rightImage?.includes("satellite")) {
                    delete navData[state.location]['rightImage'];
                }
            }

            if (action.tractorbeamEngaged) {
                newState.engagedItem = 'tractorbeam';
            }
        }

        return {
            ...newState,
            navigationData: navData
        };
    }),
);