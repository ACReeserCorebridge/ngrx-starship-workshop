import { createAction, props } from "@ngrx/store";
import { NavigationData } from "../nav-db.service";

export const echo = createAction(
    '[computer] echo', 
    props<{message: string}>()
);

export const toggleTractorBeam = createAction(
    '[computer] Toggle tractor beam',
    props<{status: boolean}>()
);

export const toggleShield = createAction(
    '[computer] Toggle shield',
    props<{percentage: number}>()
);

export const toggleDocking = createAction(
    '[computer] Docking',
    props<{status: boolean}>()
);

export const toggleLaser = createAction(
    '[computer] Toggle laser',
    props<{percentage: number}>() 
);

export const selectEngine = createAction(
    '[computer] Switch engine',
    props<{percentage: number}>()
);

export const loadNavData = createAction(
    '[computer] Load Navigation Data'
);

export const loadNavDataSuccess = createAction(
    '[computer] Load Navigation Data Success',
    props<{navs: NavigationData[]}>()
);

export const loadNavDataError = createAction(
    '[computer] Load Navigation Data Error'
);
