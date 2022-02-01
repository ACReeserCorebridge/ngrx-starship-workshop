/**
 * computer action file!
 * 
 * all action definitions go in this file
 */
import { createAction, props } from "@ngrx/store";
import { AdjPhrase, Adverb, IComputerDirective, SolarSystemLocation } from "../challenge.service";
import { NavigationData } from "../nav-db.service";

/**
 * this is an example action, feel free to change it
 */
export const echo = createAction(
    '[computer] echo', 
    props<{message: string}>()
);

export const activateDockingClamp = createAction(
    '[computer] Activate Docking Clamp',
    props<IComputerDirective>()
);

export const activateTractorBeam = createAction(
    '[computer] Activate Tractor Beam'
);

export const deactivateTractorBeam = createAction(
    '[computer] Deactivate Tractor Beam'
)

export const engageEngine = createAction(
    '[computer] Engage Engine',
    props<{adverb: Adverb | undefined}>()
);

export const disengageEngine = createAction(
    '[computer] Disengage Engine'
);

export const plotCourse = createAction(
    '[computer] Plot Course',
    props<{course: SolarSystemLocation}>()
);

export const activateShield = createAction(
    '[computer] Activate Shield',
    props<{adverb: Adverb | undefined}>()
);

export const deactivateShield = createAction(
    '[computer] Deactivate Shield'
);

export const activateLaser = createAction(
    '[computer] Activate Laser',
    props<{adverb: Adverb | undefined}>()
);

export const deactivateLaser = createAction(
    '[computer] Deactivate Laser'
);

// these three actions are for loading Navigation data
export const loadNavData = createAction('[computer] Load Navigation Data');
export const loadNavDataSuccess = createAction('[computer] Load Navigation Data Success', props<{navs: NavigationData[]}>());
export const loadNavDataError = createAction('[computer] Load Navigation Data Error');

// https://ngrx.io/guide/store/actions