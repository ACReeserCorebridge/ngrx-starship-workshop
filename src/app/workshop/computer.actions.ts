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
export const echo = createAction('[computer] echo', props<{ message: string }>());

export const toggleTractorBeam = createAction('[computer] Toggle Tractor Beam', props<{ status: boolean, navs?: NavigationData[] }>());
export const activateShield = createAction('[computer] Activate Shield', props<{ armour: number, navs: NavigationData[] }>());
export const toggleDocking = createAction('[computer] Docking', props<{ engaged: boolean }>());
export const activateLaser = createAction('[computer] Activate Laser', props<{ intensity: number, navs?: NavigationData[] }>());
export const activateEngine = createAction('[computer] Activate Engine', props<{ speed: number, navs?: NavigationData[] }>());

// these three actions are for loading Navigation data
export const loadNavData = createAction('[computer] Load Navigation Data');
export const loadNavDataSuccess = createAction('[computer] Load Navigation Data Success', props<{ navs: NavigationData[], armour?: number }>());
export const loadNavDataError = createAction('[computer] Load Navigation Data Error');

//TODO: add a lot more action definitions!
// https://ngrx.io/guide/store/actions
