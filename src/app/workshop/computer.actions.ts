/**
 * computer action file!
 * 
 * all action definitions go in this file
 */
import { createAction, props } from "@ngrx/store";
import { AdjPhrase } from "../challenge.service";
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

export const engageEngine = createAction('[computer] Engage Engine', props<{power: number}>());
export const disengageEngine = createAction('[computer] Disengage Engine');

export const engageShield = createAction('[computer] Engage Shield', props<{shield: number}>());
export const disengageShield = createAction('[computer] Disengage Shield');

export const engageLaser = createAction('[computer] Engage Laser', props<{power: number}>());
export const disengageLaser = createAction('[computer] Disengage Laser');

export const engageTractorBeam = createAction('[computer] Engage Tractor Beam');
export const disengageTractorBeam = createAction('[computer] Disengage Tractor Beam');

export const engageDockClamp = createAction('[computer] Engage Dock Clamp');
export const disengageDockClamp = createAction('[computer] Disengage Dock Clamp');

export const plotCourse = createAction('[computer] Plot Course', props<{location: AdjPhrase}>());

// https://ngrx.io/guide/store/actions