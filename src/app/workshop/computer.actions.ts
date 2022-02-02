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

export const disengageDockingClamp = createAction('[computer] disengage docking clamp');
export const engageDockingClamp = createAction('[computer] engage docking clamp');

export const engageEngines = createAction('[computer] engage engines', props<{adverb: 'fully'|'halfway'|'slowly'|undefined}>());
export const disengageEngines = createAction('[computer] disengage engines');

export const plotCourse = createAction('[computer] plot course', props<{adjectivalPhrase: 'to Luna orbit'|'to the asteroid belt'|'to LEO'|undefined}>());

export const engageTractorBeam = createAction('[computer] engage tractorbeam');
export const disengageTractorBeam = createAction('[computer] disengage tractorbeam');

export const engageShields = createAction('[computer] engage shields', props<{adverb: 'fully'|'halfway'|'slowly'|undefined}>());
export const disengageShields = createAction('[computer] disengage shields');

export const engageLaser = createAction('[computer] engage laser', props<{adverb: 'fully'|'halfway'|'slowly'|undefined}>());
//TODO: add a lot more action definitions!
// https://ngrx.io/guide/store/actions