/**
 * computer reducer file!
 * 
 * all main computer logic should go in this file
 */
import { LocationStrategy } from "@angular/common";
import { createReducer, on } from "@ngrx/store";
import { SolarSystemLocation } from "../challenge.service";
import { NavigationData } from "../nav-db.service";
import { echo, loadNavDataSuccess, disengageDockingClamp, engageEngines, plotCourse, disengageEngines, engageTractorBeam, disengageTractorBeam, engageDockingClamp, engageShields, engageLaser, disengageShields } from "./computer.actions";

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
    shield:number,
    tractorbeam:boolean,
    tractorView?:boolean
    engine:number,
    navigationData:NavigationData[],
    docking:boolean,
    course?:SolarSystemLocation,
    location?:SolarSystemLocation,
    satelliteView?:boolean,
    asteroidView?: boolean,
    laserView?:boolean,
    laser:number,
    //TODO: add a lot more state!
}

export const InitialComputerState: ComputerState = {
    echoMessages: [],
    shield:0,
    tractorbeam:true,
    engine:0,
    navigationData:[],
    docking:false,
    satelliteView:false,
    laser:0,
    asteroidView:false,
    laserView:false
    //TODO: add additional initial state!
}

export const computerReducer = createReducer<ComputerState>(
    InitialComputerState,
    on(echo, (state, action) => {

        console.log(`---echo: location: ${state.location} state.satelliteView:  ${state.satelliteView}`)

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
            navigationData : action.navs
        }
    }),
    on(engageDockingClamp, state => {
        return {
            ...state,
            docking : true
        }
    }),
    on(disengageDockingClamp, (state, action) => {

        return {
            ...state,
            docking : false
        }
    }),
    on(engageEngines, (state, action) => {

        switch(action.adverb){
            case 'fully':

                if (state.course && state.course == 'LunaOrbit') {
                    return {
                        ...state,
                        engine: 10,
                        satelliteView: true
                    }
                } else {

                    return {
                        ...state,
                        engine: 10
                    }
                }

                break;
            case 'halfway':

                if (state.shield == 5 && state.course == 'AsteroidBelt') {

                    return {
                        ...state,
                        engine: 5,
                        laserView: false,
                        asteroidView: true
                    }

                }

                return {
                    ...state,
                    engine: 5
                }
                break;
            case 'slowly':
                if(state.location == 'LEO'){
                    return {
                        ...state,
                        engine: 1
                    }
                }

                return {
                    ...state,
                    engine: 1
                }
                break;
            default:
                return {
                    ...state,
                    engine : 1
                }
        }
    }),
    on(disengageEngines, (state) => {

        if(state.course && state.course == 'LunaOrbit'){
            return {
                ...state,
                engine : 0,
                location : 'LunaOrbit',
                satelliteView : true
            }

        }else if(state.location && state.location == 'AsteroidBelt'){
            return {
                ...state,
                engine:0,
                asteroidView:false
            }
        }else{

            return {
                ...state,
                engine : 0
            }
        }
        
    }),
    on(plotCourse, (state, action)=>{

      
        if (action.adjectivalPhrase == 'to LEO') {
            return {
                ...state,
                course: 'LEO',
                location: 'LEO'
            }
        }
        if (action.adjectivalPhrase == 'to the asteroid belt') {
            return {
                ...state,
                course: 'AsteroidBelt',
                location: 'AsteroidBelt'
            }
        }

        if (action.adjectivalPhrase == 'to Luna orbit') {
            return {
                ...state,
                course: 'LunaOrbit',
                location: 'LunaOrbit'
            }
        }

        return {
            ...state
        }
                
        
    }),
    on(engageTractorBeam, (state) => {
        if (state.location && state.location == 'LunaOrbit' &&
            state.engine === 0) {
            return {
                ...state,
                satelliteView : true,
                tractorbeam: true,
                tractorView: true
            }
        } else {

            return {
                ...state,
                tractorbeam: true
            }
        }

    }),
    on(disengageTractorBeam, (state) => {
        return {
            ...state,
            tractorbeam:false,
            tractorView : false,
            satelliteView : false
        }
    }),
    on(engageShields, (state, action)=>{
        if(action.adverb === 'halfway'){
            return {
                ...state,
                shield : 5
            }
        }

        if(action.adverb === 'fully'){

            if(state.location == 'AsteroidBelt' && state.engine === 0){

                return {
                    ...state,
                    shield:10,
                    laser: 0,
                    laserView : false
                }

            }

            return {
                ...state,
                shield:10
            }
        }

        return {
            ...state
        }
    }),
    on(disengageShields, (state, action)=>{

        return {
            ...state,
            shield:0
        }
    }),
    on(engageLaser, (state, action)=>{
        if(action.adverb === 'halfway'){

            if(state.location === 'AsteroidBelt' && state.engine === 0 && state.shield === 5){
                return {
                    ...state,
                    laser : 5,
                    laserView: true,
                    asteroidView: false
                }
            }else{
                return {
                    ...state,
                    laser:5
                }
            }

        }

        
        return {
            ...state
        }
    })
    //TODO: use the NavigationData[] to set viewscreen state depending on location and/or course!
    //TODO: add a lot more reducer action logic!
    // https://ngrx.io/guide/store/reducers
    // there should be a lot of logic in here!
);

 