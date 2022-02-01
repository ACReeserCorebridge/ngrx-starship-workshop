/**
 * computer action file!
 * 
 * all action definitions go in this file
 */
import { createAction, props } from "@ngrx/store";
import { SolarSystemLocation } from "../challenge.service";
import { NavigationData } from "../nav-db.service";
import { ComputerState } from "./computer.reducer";

export class ComputerAction {
    action: string;
    keyID: string;
    parameters: { [key: string]: string | number | boolean | undefined }

    /**
     *
     */
    constructor(action: string, keyID: string) {
        this.action = action;
        this.keyID = keyID;
        this.parameters = {};
    }

    addParam(key: string, value: string | number | boolean | undefined) {
        this.parameters[key] = value;
    }

    toDispatchParameters() {
        return {
            keyID: this.keyID,
            param: this.parameters
        }
    }
}

/**
 * this is an example action, feel free to change it
 */
export const echo = createAction(
    '[computer] echo',
    props<{ messages: string[] }>()
);

// these three actions are for loading Navigation data
export const loadNavData = createAction('[computer] Load Navigation Data');
export const loadNavDataSuccess = createAction('[computer] Load Navigation Data Success', props<{ navs: NavigationData }>());
export const loadNavDataError = createAction('[computer] Load Navigation Data Error');

export const engage = createAction('[computer] engage', props<{ keyID: string, param: Partial<ComputerState> }>())
export const disengage = createAction('[computer] disengage', props<{ keyID: string, param: Partial<ComputerState> }>())
export const beforePlot = createAction('[computer] before plot', props<{ course: SolarSystemLocation }>())
export const plot = createAction('[computer] plot', props<{ currentLocation: NavigationData }>())