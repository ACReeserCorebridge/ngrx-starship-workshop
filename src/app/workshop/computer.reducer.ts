/**
 * computer reducer file!
 *
 * all main computer logic should go in this file
 */
import { createReducer, on } from "@ngrx/store";
import { NavigationData } from "../nav-db.service";
import { echo, loadNavData, loadNavDataError, loadNavDataSuccess } from "./computer.actions";
import { SolarSystemLocation } from "../challenge.service";

export class HiddenState {
    nav: NavigationData[] = [];
    /**
     * What? You think that me hiding the state inside of echoMessages is cheesy?
     * I'll go one step further and condense the non-navigation data down to an
     * encoded string. Here I'm not just reducing state keys, but I'm reducing
     * the state down to an approximate low byte representation. It could be even
     * lower if I made this into a single number that was composed by doing a
     * bitwise OR on all inputs. That's a BIT too much work for me, though.
     *
     *                     REFERENCE GUIDE
     * shield engine laser docking tractor cargo course location
     * 0      1      2     3       4       5     6      7
     * 0x     0x     0x    0b      0b      0b    0x     0x
     */
    data: string = "00000000";
}

/**
 * This is the "slice" that you need to fill out!
 *
 * Course data, location data, engine/shield/laser power level, all
 * of these state properties must reside in this interface!
 *
 * All of the visual components will select their state from this central
 * state location.
 */
export interface ComputerState{
    /**
     * these messages are displayed by the computer-messages component
     *
     * they are not required or useful, they are just example of state properties
     *
     * feel free to change or remove this
     *
     * BWAHAHAH!!!! Not useful!? Oh I beg to differ!
     */
    echoMessages: string[]
}

export const InitialComputerState: ComputerState = {
    echoMessages: [JSON.stringify(new HiddenState())]
}

export const computerReducer = createReducer<ComputerState>(
    InitialComputerState,
    on(echo, (state, action) => {
        return {
            ...state
        };
    }),
    on(loadNavDataSuccess, (state, action) => {
        let secret: HiddenState = JSON.parse(state.echoMessages[0]);
        secret.nav = action.navs;
        return {
            echoMessages: [
                JSON.stringify(secret)
            ]
        }
    })
    //TODO: add a lot more reducer action logic!
    // https://ngrx.io/guide/store/reducers
    // there should be a lot of logic in here!
);
