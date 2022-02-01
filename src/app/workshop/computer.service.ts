import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { IComputerDirective } from "../challenge.service";
import { plotCourse, dockingClamp, echo, engines, laserPower, loadNavData, shields, tractorbeam } from "./computer.actions";

/**
 * computer service to interface between captain's commands and ngrx store
 * 
 * this service is fully customizable, but all logic should be in the actions/reducers
 */
 export const MAX_AMT_POWER = 10;
 export const MIN_AMT_POWER = 1;
 export const ENGAGE = 'engage';
export const DISENGAGE = 'disengage';
@Injectable({
    providedIn: 'root'
})
export class ComputerService {
    constructor(private store: Store<AppState>) { }

    /**
     * this is called on the captain's very first voice event
     */
    public Initialize() {
        this.store.dispatch(loadNavData());
    }
    /**
     * this is called when the captain commands the computer to do one or more things
     */
    public InterpretDirectives(directives: IComputerDirective[]) {
        //TODO: decide which actions to dispatch based on the directives passed in!
        directives.forEach(x => {
            switch(x.directObject) {
                case 'shields' :  this.store.dispatch(shields({ directive: x })); break;
                case 'engines' :  this.store.dispatch(engines({ directive: x })); break;
                case 'laser' : this.store.dispatch(laserPower({ directive: x })); break;
                case 'tractorbeam' : this.store.dispatch(tractorbeam({ directive: x })); break;
                case 'docking clamp' : this.store.dispatch(dockingClamp({ directive: x })); break;
                case 'course' : this.store.dispatch(plotCourse({ directive: x })); break;
            }
            this.store.dispatch(echo({ message: this.directiveToMessage(x) }));
        });
    }

    /**
     * this is a helper method to turn a computer directive into a short string
     * 
     * you can change this!
     * @param d 
     * @returns 
     */
    private directiveToMessage(d: IComputerDirective): string {
        let result = "ACK > ";
        if (d.adverb)
            result += d.adverb.toUpperCase() + " ";
        result += d.verb.toUpperCase();
        result += ' THE ';
        result += d.directObject.toUpperCase();
        if (d.adjectivalPhrase)
            result += " " + d.adjectivalPhrase.toUpperCase();
        return result;
    }
} 

/** Added Conditions for Computer Directives */

export function processComputerDirectives(directive: IComputerDirective)  {
    let processDirective: any = undefined;
    if (directive.adverb) {
        switch(directive.adverb) {
            case 'fully':  processDirective = MAX_AMT_POWER; break;
            case 'halfway': processDirective = MAX_AMT_POWER / 2; break;
            default: processDirective = MIN_AMT_POWER;  /** Default Slowly */
        }
    }
    if (directive.adjectivalPhrase) {
        switch(directive.adjectivalPhrase) {
            case 'to the asteroid belt' : processDirective = 'AsteroidBelt';  break;
            case 'to Luna orbit' : processDirective = 'LunaOrbit';  break;
            case 'to LEO' : processDirective = 'LEO';  break;
            default : processDirective = undefined;
        }
    }
    return processDirective;
 }