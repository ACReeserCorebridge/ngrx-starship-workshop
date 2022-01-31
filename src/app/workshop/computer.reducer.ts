/**
 * computer reducer file!
 * 
 * all main computer logic should go in this file
 */
import { createReducer, on } from "@ngrx/store";
import { NavigationData } from "../nav-db.service";
import { disengage, echo, engage, loadNavDataSuccess, plot } from "./computer.actions";

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
    //TODO: add a lot more state!
    laserPower: number,
    shieldHealth: number,
    enginePower: number,
    isDockingClampReady: boolean,
    tractorView: boolean

    leftImage: string | undefined,
    centerImage: string | undefined,
    rightImage: string | undefined,
    location: string | undefined,
    course: string | undefined,

    laser: boolean,
    tractor: boolean,
    
    navs: NavigationData[]
}

export const InitialComputerState: ComputerState = {
    echoMessages: [],
    //TODO: add additional initial state!
    laserPower: 5,
    shieldHealth: 4,
    enginePower: 1,
    isDockingClampReady: false,
    tractorView: true,

    leftImage: undefined,
    centerImage: undefined,
    rightImage: undefined,
    location: undefined,
    course: undefined,

    laser: false,
    tractor: false,

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
    on(engage, (state, action) =>{
        switch(action.directObject){
            case 'engines':
                switch(action.adverb)
                {
                    case 'fully':
                        return {
                            ...state,
                            enginePower: 10,
                            laserPower: 0,
                            shieldHealth: 0
                        }
                    case 'halfway':
                        return {
                            ...state,
                            enginePower: 5,
                        }
                    case 'slowly':
                        return {
                            ...state,
                            enginePower: 1
                        }
                    default:
                        return {
                            ...state
                        }
                }
 
            case 'tractorbeam':
                return {
                    ...state,
                    tractorView: true,
                    tractor: true
                }
            case 'shields':
                switch(action.adverb)
                {
                    case 'fully':
                        return {...state, shieldHealth: 10, enginePower: 0, laser: false, laserPower: 0 }
                    case 'halfway':
                        return { ...state, shieldHealth: 5}
                    default:
                        return { ...state };
                }
            case 'laser':
                switch(action.adverb)
                {
                    case 'halfway':
                        return { ...state, laserPower: 5, laser: true}
                    default:
                        return { ...state };
                }
            case 'docking clamp':
                return {
                    ...state,
                    isDockingClampReady: true
                }
            default:
                return { ...state };
        }
        
    }),
    on(disengage, (state, action) =>{
        switch(action.directObject){
            case 'engines':
                return {
                    ...state,
                    centerImage: undefined,
                    enginePower: 0
                };
            case 'shields':
                return {
                    ...state,
                    shieldHealth: 0
                }
            case 'laser':
                return {
                    ...state,
                    laserPower: 0
                }
            case 'tractorbeam':
                return {
                    ...state,
                    tractorView: false,
                    tractor: false,
                    leftImage: undefined
                }
            default:
                return {
                    ...state
                }
        }
    }),
    on(plot, (state, action) =>{
        const locationString  = action.adjectivalPhrase?.replace('to the ', '').replace('to ', '').replace(' ', '');
        const location = state.navs.find(x => x.location.toLocaleLowerCase() == locationString?.toLowerCase());
        switch(action.directObject){
            case 'course':
                if(location){
                    return {
                        ...state,
                        course: location.location,
                        location: location.location,
                        rightImage: location.rightImage,
                        leftImage : location.leftImage,
                        centerImage: location.centerImage
                    }
                }   
                else{
                    return {
                        ...state,
                        course: state.navs[0].location,
                        location: state.navs[0].location,
                        rightImage: state.navs[0].rightImage,
                        leftImage : state.navs[0].leftImage,
                        centerImage: state.navs[0].centerImage
                    }
                }
            default:
                return {
                    ...state,
                }
        }
        
    }),
    on(loadNavDataSuccess, (state, action) =>{
        return {...state, navs: [...action.navs] }
    })
    
    //TODO: add an on() listener for loadNavDataSuccess that puts NavigationData[] in the state!
    //TODO: use the NavigationData[] to set viewscreen state depending on location and/or course!
    //TODO: add a lot more reducer action logic!
    // https://ngrx.io/guide/store/reducers
    // there should be a lot of logic in here!
);

 