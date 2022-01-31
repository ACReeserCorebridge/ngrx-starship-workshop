/**
 * computer action file!
 * 
 * all action definitions go in this file
 */
import { createAction, props } from "@ngrx/store";
import { NavigationData } from "../nav-db.service";

export interface GenericActionProperties{
    directObject: string|undefined,
    adverb: string|undefined
    adjectivalPhrase: string|undefined
}

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

//TODO: add a lot more action definitions!
export const engage = createAction('[computer] Engage', props<GenericActionProperties>());
export const disengage = createAction('[computer] Disengage', props<GenericActionProperties>());
export const plot = createAction('[computer] Plot', props<GenericActionProperties>())
// https://ngrx.io/guide/store/actions