/**
 * computer action file!
 * 
 * all action definitions go in this file
 */
import { createAction, props } from "@ngrx/store";
import { SolarSystemLocation } from "../challenge.service";
import { NavigationData } from "../nav-db.service";
import { ViewscreenState } from "./viewscreen/viewscreen.component";

/**
 * this is an example action, feel free to change it
 */
export const echo = createAction(
    '[computer] echo', 
    props<{message: string}>()
);

export const loadNavData = createAction(
    '[computer] Load Navigation Data'
    );
export const loadNavDataSuccess = createAction(
    '[computer] Load Navigation Data Success', 
    props<{navs: NavigationData[]}>());
export const loadNavDataError = createAction(
    '[computer] Load Navigation Data Error'
    );

export const setEnginePower = createAction(
    '[computer] Set Engine Power', 
    props<{value: number}>()
    );
export const setLaserPower = createAction(
    '[computer] Set Laser Power', 
    props<{value: number}>()
    );
export const setShieldPower = createAction(
    '[computer] Set Shield Power', 
    props<{value: number}>()
    );
export const setDockingClamp = createAction(
    '[computer] Set Docking Clamp', 
    props<{value: boolean}>()
    );
export const setTractorBeam = createAction(
    '[computer] Set Tractor Beam', 
    props<{value: boolean}>()
    );
export const setTractorView = createAction(
    '[computer] Set Tractor View', 
    props<{value: boolean}>()
    );
export const setLaserView = createAction(
    '[computer] Set Laser View', 
    props<{value: boolean}>()
    );   
export const setViewScreenState = createAction(
    '[computer] Set View Screen State', 
    props<{value: SolarSystemLocation}>()
);     
