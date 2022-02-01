/**
 * computer action file!
 * 
 * all action definitions go in this file
 */
import { createAction, props } from "@ngrx/store";
import { SolarSystemLocation } from "../challenge.service";
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

export interface StateUpdate {
    course: SolarSystemLocation|undefined,
    lasers: number|undefined,
    engines: number|undefined,
    docking: boolean|undefined,
    shields: number|undefined,
    tractorbeamEngaged: boolean|undefined
}

export const adjustState = createAction('[computer] adjust state', props<StateUpdate>());