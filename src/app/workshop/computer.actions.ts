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

//TODO: add a lot more action definitions!
// https://ngrx.io/guide/store/actions

export const engageEngineSlowly = createAction(
    '[computer] engageEngineSlowly', 
    props<{docking: boolean, engine: number}>()
);

export const engageEngine = createAction(
    '[computer] engageEngineSlowly', 
    props<{docking: boolean, engine: number}>()
);

export const disEngageDockingClamp = createAction(
    '[computer] disEngageDockingClamp', 
    props<{docking: boolean, engine: number}>()
);

export const engageDockingClamp = createAction(
    '[computer] engageDockingClamp', 
    props<{docking: boolean, engine: number}>()
);

export const plotCourseToLunaOrbit = createAction(
    '[computer] plotCourseToLunaOrbit', 
    props<{course: SolarSystemLocation, satelliteView: boolean}>()
);

export const disengageEngines = createAction(
    '[computer] disengageEngines', 
    props<{course: SolarSystemLocation, engine: number, docking:boolean}>()
);

export const engageTractorbeam = createAction(
    '[computer] engageTractorbeam', 
    props<{location: SolarSystemLocation, engine: number, satelliteView:boolean, tractorbeam: boolean, tractorView: boolean}>()
);

export const disengageTractorbeam = createAction(
    '[computer] disengageTractorbeam', 
    props<{engine: number, satelliteView:boolean, tractorbeam: boolean, tractorView: boolean}>()
);

export const plotCourseToAsteroidBelt = createAction(
    '[computer] plotCourseToAsteroidBelt', 
    props<{course: SolarSystemLocation}>()
);

export const halfwayEngageShields = createAction(
    '[computer] halfwayEngageShieldsAndEngine', 
    props<{engine: number, shield: number, laserView: boolean}>()
);

export const halfwayEngageEngine = createAction(
    '[computer] halfwayEngageEngine', 
    props<{engine:number, shield:number, laserView: boolean}>()
);

export const halfwayEngageLaser = createAction(
    '[computer] halfwayEngageLaser', 
    props<{location: SolarSystemLocation, engine:number, laser: number, shield: number, laserView: boolean, asteroidView: boolean}>()
);

export const fullyEngageShields = createAction(
    '[computer] fullyEngageShields', 
    props<{location: SolarSystemLocation, laser: number, engine:number, shield: number, laserView: boolean, asteroidView: boolean}>()
);

export const disEngageShields = createAction(
    '[computer] disEngageShields', 
    props<{shield: number}>()
);

export const plotCourseToLeo = createAction(
    '[computer] plotCourseToLeo', 
    props<{course: SolarSystemLocation}>()
);

export const fullyEngageEngine = createAction(
    '[computer] fullyEngageEngine', 
    props<{engine: number}>()
);







