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

export const plotCourse = createAction('[computer] plot course', props<{location: SolarSystemLocation}>());
export const adjustLasers = createAction('[computer] adjust lasers', props<{level: number}>());
export const adjustEngines = createAction('[computer] adjust engines', props<{level: number}>());
export const adjustDockingClamp = createAction('[computer] adjust docking clamp', props<{docking: boolean}>());
export const adjustShields = createAction('[computer] adjust shields', props<{level: number}>());
export const adjustTractorBeam = createAction('[computer] adjust tractor beam', props<{engaged: boolean}>());