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
  props<{ message: string }>()
);

// these three actions are for loading Navigation data
export const loadNavData = createAction('[computer] Load Navigation Data');
export const loadNavDataSuccess = createAction('[computer] Load Navigation Data Success', props<{ navs: NavigationData[] }>());
export const loadNavDataError = createAction('[computer] Load Navigation Data Error');

// engine actions
export const slowlyEngageEngine = createAction('[computer] slowly engage engines');
export const halfwayEngageEngine = createAction('[computer] halfway engage engines');
export const fullyEngageEngine = createAction('[computer] fully engage engines');
export const disengageEngine = createAction('[computer] disengage engines');

// docking clamp actions
export const disengageDockingClamp = createAction('[computer] disengage docking clamp');
export const engageDockingClamp = createAction('[computer] engage docking clamp');

//course
export const plotCourseLunaOrbit = createAction('[computer] plot course to Luna orbit');
export const plotCourseAsteroidBelt = createAction('[computer] plot course to the asteroid belt');
export const plotCourseLEO = createAction('[computer] plot course to LEO');

//tractorbeam
export const engageTractorbeam = createAction('[computer] engage tractorbeam');
export const disengageTractorbeam = createAction('[computer] disengage tractorbeam');

//shields
export const halfwayEngageShields = createAction('[computer] halfway engage shields');
export const fullyEngageShields = createAction('[computer] fully engage shields');
export const disengageShields = createAction('[computer] disengage shields');

// laser
export const halfwayEngageLaser = createAction('[computer] halfway engage laser');
