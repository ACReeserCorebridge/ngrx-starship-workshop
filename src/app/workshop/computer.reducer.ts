/**
 * computer reducer file!
 * 
 * all main computer logic should go in this file
 */
import { createReducer, on } from "@ngrx/store";
import { SolarSystemLocation } from "../challenge.service";
import { NavigationData } from "../nav-db.service";
import { 
    echo, 
    loadNavDataSuccess, 
    plotCourseToLunaOrbit, 
    disengageEngines,
    engageTractorbeam,
    disengageTractorbeam,
    plotCourseToAsteroidBelt,
    halfwayEngageShields,
    halfwayEngageEngine,
    halfwayEngageLaser,
    fullyEngageShields,
    disEngageShields,
    plotCourseToLeo,
    fullyEngageEngine,
    engageEngine,
    engageEngineSlowly,
    engageDockingClamp,
    disEngageDockingClamp
 } from "./computer.actions";

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

    docking: boolean,
    laserAmout: number,
    dockingClamp: boolean,
    shields: boolean,
    tractorbeam: boolean,
    course: SolarSystemLocation,
    satelliteView: boolean,

    location: SolarSystemLocation,
    leftImage: string | undefined,
    centerImage: string | undefined,
    rightImage: string | undefined,
    tractor: boolean,

    /**
     * the amount of power to the shield.
     * 
     * Must be from 0-10
     */
     shield:number,
     /**
      * the amount of power to the engine.
      * 
      * Must be from 0-10
      */
     engine:number,
     /**
      * the amount of power to the laser.
      * 
      * Must be from 0-10
      */
     laser:number,
     asteroidView: boolean,
     tractorView:boolean,
     laserView:boolean,

     navigationData: NavigationData[]

    //TODO: add a lot more state!
}

export const InitialComputerState: ComputerState = {
    echoMessages: [],
    docking: false,
    engine: 1,
    laserAmout: 1,
    dockingClamp: false,
    shields: false,
    tractorbeam: false,

    course: 'LunaOrbit',
    satelliteView: false,

    location: 'LunaOrbit',
    leftImage: '/assets/satellite.png',
    centerImage: '/assets/luna.png',
    rightImage: undefined,
    laser: 0,
    tractor: false,

    shield: 0,
    asteroidView: false,
    tractorView: false,
    laserView: false,
    navigationData: [
        {
            location: 'LunaOrbit',
            leftImage: '/assets/satellite.png',
            centerImage: '/assets/luna.png',
            rightImage: undefined,
        }
    ]

    //TODO: add additional initial state!
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
    //TODO: add a lot more reducer action logic!
    // https://ngrx.io/guide/store/reducers
    // there should be a lot of logic in here!

    on(loadNavDataSuccess, (state, action) => {
        const data = action.navs.find(x => x.location == state.location);
        return {
            ...state,
            navigationData: action.navs,
        };
    }),

    on(engageEngineSlowly, (state, action) => {
        return {
            ...state,
            docking: action.docking,
            engine: action.engine,
        };
    }),

    on(engageEngine, (state, action) => {
        return {
            ...state,
            docking: action.docking,
            engine: action.engine,
        };
    }),

    on(plotCourseToLunaOrbit, (state, action) => {
        return {
            ...state,
            course: action.course,
            satelliteView: action.satelliteView,
        };
    }),

    on(disengageEngines, (state, action) => {
        const data = state.navigationData.find(x => x.location == 'LunaOrbit');
        let leftImg = data && data.leftImage ? data.leftImage : undefined;
        return {
            ...state,
            course: action.course,
            engine: action.engine,
            leftImage: leftImg,
            docking: action.docking
        };
    }),

    on(engageTractorbeam, (state, action) => {
        const data = state.navigationData.find(x => x.location == 'LunaOrbit');
        let leftImg = data && data.leftImage ? data.leftImage : undefined;
        return {
            ...state,
            location: 'LunaOrbit',
            engine: action.engine,
            leftImage: leftImg,
            tractorbeam: action.tractorbeam,
            tractor: action.tractorView
        };
    }),

    on(disengageTractorbeam, (state, action) => {
        return {
            ...state,
            engine: action.engine,
            tractorbeam: action.tractorbeam,
            tractor: action.tractorView,
            leftImage: action.satelliteView ? state.leftImage : undefined
        };
    }),

    on(plotCourseToAsteroidBelt, (state, action) => {
        return {
            ...state,
            leftImage: undefined,
            course: 'AsteroidBelt'
        };
    }),

    on(halfwayEngageShields, (state, action) => {
        const data = state.navigationData.find(x => x.location == 'AsteroidBelt');
        let centerImg = data && data.centerImage ? data.centerImage : undefined;
        return {
            ...state,
            shield: action.shield,
            laserView: action.laserView,
            centerImage: centerImg
        };
    }),

    on(halfwayEngageEngine, (state, action) => {
        const data = state.navigationData.find(x => x.location == 'AsteroidBelt');
        let centerImg = data && data.centerImage ? data.centerImage : undefined;
        return {
            ...state,
            engine: action.engine,
            laserView: action.laserView,
            centerImage: centerImg
        };
    }),

    on(halfwayEngageLaser, (state, action) => {
        return {
            ...state,
            location: action.location,
            engine: action.engine,
            laser: action.laser,
            shield: action.shield,
            laserView: action.laserView,
            centerImage: undefined
        };
    }),

    on(fullyEngageShields, (state, action) => {
        return {
            ...state,
            location: action.location,
            laser: action.laser,
            engine: action.engine,
            shield: action.shield,
            laserView: action.laserView,
            centerImage: undefined
        };
    }),

    on(disEngageShields, (state, action) => {
        return {
            ...state,
            shield: action.shield,
        };
    }),

    on(plotCourseToLeo, (state, action) => {
        const data = state.navigationData.find(x => x.location == 'LEO');
        let location = data && data.location ? data.location : 'LEO';
        return {
            ...state,
            course: location,
            location: data && data.location ? data.location : 'LEO',
            leftImage: data?.leftImage,
            centerImage: data?.centerImage,
            rightImage: data?.rightImage
        };
    }),

    on(fullyEngageEngine, (state, action) => {
        return {
            ...state,
            engine: action.engine,
        };
    }),

    on(engageDockingClamp, (state, action) => {
        return {
            ...state,
            engine: action.engine,
            docking: action.docking
        };
    }),

    on(disEngageDockingClamp, (state, action) => {
        return {
            ...state,
            engine: action.engine,
            docking: action.docking
        };
    }),


);

 