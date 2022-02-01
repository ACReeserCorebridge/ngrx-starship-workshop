/**
 * computer reducer file!
 *
 * all main computer logic should go in this file
 */
import { createReducer, on } from "@ngrx/store";
import { NavigationData } from "../nav-db.service";
import { echo, loadNavData, loadNavDataError, loadNavDataSuccess, plotCourse, toggleDocking } from "./computer.actions";
import { SolarSystemLocation } from "../challenge.service";

export class HiddenState {
    nav: NavigationData[] = [];
    /**
     * What? You think that me hiding the state inside of echoMessages is cheesy?
     * I'll go one step further and condense the non-navigation data down to an
     * encoded string. Here I'm not just reducing state keys, but I'm reducing
     * the state down to an approximate lowest byte representation. It could be
     * even lower if I made this into a single number that was composed by doing
     * a bitwise OR on all inputs. That's a BIT too much work for me, though.
     *
     *                     REFERENCE GUIDE
     * shield engine laser docking tractor cargo course location
     * 0      1      2     3       4       5     6      7
     * 0x     0x     0x    0b      0b      0b    0x     0x
     */
    data: string = "00010000";

    constructor(
        stringData?: string
    ) {
        if (stringData) {
            let old: HiddenState = JSON.parse(stringData);
            this.nav = old.nav;
            this.data = old.data;
        } else {
            this.nav = [];
            this.data = "00010000";
        }
    }

    public get shield(): number {
        return Number(`0x${this.data[0]}`);
    }

    public get engine(): number {
        return Number(`0x${this.data[1]}`);
    }

    public get laser(): number {
        return Number(`0x${this.data[2]}`);
    }

    public get docking(): boolean {
        return this.data[3] == "1";
    }

    public set docking(value: boolean) {
        let chars = [...this.data];
        chars[3] = value ? '1' : '0';
        this.data = chars.join("");
    }

    public get tractor(): boolean {
        return this.data[4] == "1";
    }

    public get course(): number {
        return Number(`0x${this.data[6]}`);
    }

    public set course(value: number) {
        let chars = [...this.data];
        chars[6] = value.toString();
        this.data = chars.join("");
    }

    public get location(): number {
        return Number(`0x${this.data[7]}`);
    }

    public toNavData(index: number): NavigationData {
        if (index >= this.nav.length) {
            return {
                location: "LEO",
                leftImage: undefined,
                centerImage: undefined,
                rightImage: undefined
            } as NavigationData;
        }
        return this.nav[index];
    }

    public findNavDataByName(name: string): NavigationData {
        let potential: NavigationData | undefined = this.nav.find(x => x.location == name)
        if (potential) {
            return potential;
        }
        return this.toNavData(999999999);
    }
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
    echoMessages: string
}

export const InitialComputerState: ComputerState = {
    echoMessages: JSON.stringify(new HiddenState())
}

export const computerReducer = createReducer<ComputerState>(
    InitialComputerState,
    on(echo, (state, action) => {
        return {
            ...state
        };
    }),
    on(loadNavDataSuccess, (state, action) => {
        let secret: HiddenState = new HiddenState(state.echoMessages);
        secret.nav = action.navs;
        return {
            echoMessages: JSON.stringify(secret)
        }
    }),
    on(toggleDocking, (state, action) => {
        let secret: HiddenState = new HiddenState(state.echoMessages);
        secret.docking = !secret.docking;
        return {
            echoMessages: JSON.stringify(secret)
        }
    }),
    on(plotCourse, (state, action) => {
        let toLocation = {
            'to Luna orbit' : 'LunaOrbit',
            'to the asteroid belt' : 'AsteroidBelt',
            'to LEO' : 'LEO'
        };
        let secret = new HiddenState(state.echoMessages);
        let dest = secret.findNavDataByName(toLocation[action.course])
        secret.course = (secret.nav.indexOf(dest) ?? 0);
        return {
            echoMessages: JSON.stringify(secret)
        }
    })
    //TODO: add a lot more reducer action logic!
    // https://ngrx.io/guide/store/reducers
    // there should be a lot of logic in here!
);
