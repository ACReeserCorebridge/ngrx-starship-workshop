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
export const echo = createAction(
    '[computer] echo',
    props<{ message: string }>()
);

// these three actions are for loading Navigation data
export const loadNavData = createAction('[computer] Load Navigation Data');
export const loadNavDataSuccess = createAction('[computer] Load Navigation Data Success', props<{ navs: NavigationData[] }>());
export const loadNavDataError = createAction('[computer] Load Navigation Data Error');

//TODO: add a lot more action definitions!
// https://ngrx.io/guide/store/actions
export const switchDockingClamp = createAction('[computer] Switch Docking Clamp', props<{ enable: boolean }>())

export const changeEngine = createAction('[computer] Change Engine', props<{ directive: IComputerDirective }>())