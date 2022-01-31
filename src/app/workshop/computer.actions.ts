/**
 * computer action file!
 * 
 * all action definitions go in this file
 */
import { createAction, props } from "@ngrx/store";
import { IComputerDirective } from "../challenge.service";
import { NavigationData } from "../nav-db.service";

/**
 * this is an example action, feel free to change it
 */
export const echo = createAction(
    '[computer] echo', 
    props<{message: string}>()
);

export const docking = createAction(
    '[computer] docking clamp',
    props<{directive: IComputerDirective}>()
);

export const engine = createAction(
    '[computer] engines',
    props<{directive: IComputerDirective}>()
);

export const course = createAction(
    '[computer] course',
    props<{directive: IComputerDirective}>()
);

export const tractorbeam = createAction(
    '[computer] tractorbeam',
    props<{directive: IComputerDirective}>()
);

export const shield = createAction(
    '[computer] shields',
    props<{directive: IComputerDirective}>()
);

export const laser = createAction(
    '[computer] laser',
    props<{directive: IComputerDirective}>()
);


// these three actions are for loading Navigation data
export const loadNavData = createAction('[computer] Load Navigation Data');
export const loadNavDataSuccess = createAction('[computer] Load Navigation Data Success', props<{navs: NavigationData[]}>());
export const loadNavDataError = createAction('[computer] Load Navigation Data Error');

//TODO: add a lot more action definitions!
// https://ngrx.io/guide/store/actions