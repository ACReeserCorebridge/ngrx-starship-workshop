/**
 * computer action file!
 * 
 * all action definitions go in this file
 */
 import { createAction, props } from "@ngrx/store";
 import { IComputerDirective } from "../challenge.service";
 import { NavigationData } from "../nav-db.service";
 
 /**
  * this is an example action, feel free to change it
  */
export const MessageActions = {
    echo: '[computer] echo',
    shields: '[computer] shields',
    engines: '[computer] engines',
    laserPower: '[computer] laser',
    tractorbeam: '[computer] tractor beam',
    clamp: '[computer] docking clamp',
    plotCourse: '[computer] plot course'
}

/** Displays Screen Messages  */

 export const echo = createAction(
    MessageActions.echo,
    props<{ message: string }>()
 );


/** Object Levels */

export const shields = createAction(
    MessageActions.shields,
    props<{ directive: IComputerDirective }>()
 );

 export const engines = createAction(
    MessageActions.engines, 
     props<{ directive: IComputerDirective }>()
 );
 
 export const laserPower = createAction(
    MessageActions.laserPower, 
    props<{ directive: IComputerDirective }>()
 );

 

 /** Active Objects */

 export const tractorbeam = createAction(
    MessageActions.tractorbeam,
    props<{ directive: IComputerDirective }>()
 );


 export const dockingClamp = createAction(
    MessageActions.clamp, 
     props<{ directive: IComputerDirective }>()
 );
 
 /** Location/View Screen */

 export const plotCourse = createAction(
    MessageActions.plotCourse,
    props<{ directive: IComputerDirective }>()
 );
 
 
 // these three actions are for loading Navigation data
 export const loadNavData = createAction('[computer] Load Navigation Data');
 export const loadNavDataSuccess = createAction('[computer] Load Navigation Data Success', props<{ navs: NavigationData[] }>());
 export const loadNavDataError = createAction('[computer] Load Navigation Data Error', props<{error: string}>());
 
 //TODO: add a lot more action definitions!
 // https://ngrx.io/guide/store/actions