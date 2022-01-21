/**
 * computer action file!
 *
 * all action definitions go in this file
 */
import { createAction, props } from "@ngrx/store";
import { NavigationData } from "../nav-db.service";

/**
 * this is an example action, feel free to change it
 */
export const echo = createAction(
    '[computer] echo',
    props<{message: string}>()
);

// these three actions are for loading Navigation data
export const loadNavData = createAction('[computer] Load Navigation Data');
export const loadNavDataSuccess = createAction('[computer] Load Navigation Data Success', props<{navs: NavigationData[]}>());
export const loadNavDataError = createAction('[computer] Load Navigation Data Error');

// engine actions
export const slowlyEngageEngine = createAction('[computer] Slowly Engage Engine');
export const fullyEngageEngine = createAction('[computer] Fully Engage Engine');
export const disengageEngine = createAction('[computer] Disengage Engine');

// docking clamp actions
export const disengageDockingClamp = createAction('[computer] disengage docking clamp');
