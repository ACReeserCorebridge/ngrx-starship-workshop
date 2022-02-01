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

export const engageShields = createAction('[computer] Engage Shields', props<{power: number}>());
export const engageEngines = createAction('[computer] Engage Engines', props<{power: number}>());
export const engageLasers = createAction('[computer] Engage Lasers', props<{power: number}>());
export const engageDock = createAction('[computer] Engage Docking Clamp');
export const engageTractorBeam = createAction('[computer] Engage Tractor Beam');

export const disengageShields = createAction('[computer] Disengage Shields', props<{power: number}>());
export const disengageEngines = createAction('[computer] Disengage Engines', props<{power: number}>());
export const disengageLasers = createAction('[computer] Disengage Lasers', props<{power: number}>());
export const disengageDock = createAction('[computer] Disengage Docking Clamp');
export const disengageTractorBeam = createAction('[computer] Disengage Tractor Beam');

export const plotCourse = createAction('[computer] Plot Course', props<{goto: SolarSystemLocation}>());

// https://ngrx.io/guide/store/actions
