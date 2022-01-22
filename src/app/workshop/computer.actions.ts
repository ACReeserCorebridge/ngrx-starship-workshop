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

export const enableTractorBeam = createAction(
    '[computer] enable tractor beam',
    props<{status: boolean}>()
);

export const shieldUp = createAction(
    '[computer] shield up'
);

export const docking = createAction(
    '[computer] docking',
    props<{status: boolean}>()
);

export const laserUp = createAction(
    '[computer] laser up'
);

export const selectEngine = createAction(
    '[computer] select engine'
);
// these three actions are for loading Navigation data
export const loadNavData = createAction('[computer] Load Navigation Data');
export const loadNavDataSuccess = createAction('[computer] Load Navigation Data Success', props<{navs: NavigationData[]}>());
export const loadNavDataError = createAction('[computer] Load Navigation Data Error');

//TODO: add a lot more action definitions!
// https://ngrx.io/guide/store/actions