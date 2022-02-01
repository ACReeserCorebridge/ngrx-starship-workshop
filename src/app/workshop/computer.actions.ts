/**
 * computer action file!
 * 
 * all action definitions go in this file
 */
import { createAction, props } from "@ngrx/store";
import { AdjPhrase, DirectObject } from "../challenge.service";
import { NavigationData } from "../nav-db.service";

/**
 * this is an example action, feel free to change it
 */
export const echo = createAction(
    '[computer] echo', 
    props<{message: string}>()
);

export const setObjectLevel = createAction(
    '[computer] objectLevel', 
    props<{object: 'shields'|'engines'|'laser', level: number}>()
);
export const setIsObjectActive = createAction(
    '[computer] objectActive', 
    props<{object: 'docking clamp'|'tractorbeam', active: boolean}>()
);
export const plotCourse = createAction(
    '[computer] course',
    props<{course: AdjPhrase }>()
);

// these three actions are for loading Navigation data
export const loadNavData = createAction('[computer] Load Navigation Data');
export const loadNavDataSuccess = createAction('[computer] Load Navigation Data Success', props<{navs: NavigationData[]}>());
export const loadNavDataError = createAction('[computer] Load Navigation Data Error', props<{error: string}>());

//TODO: add a lot more action definitions!
// https://ngrx.io/guide/store/actions