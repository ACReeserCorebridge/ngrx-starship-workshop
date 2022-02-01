import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { IComputerDirective } from "../challenge.service";
import { echo, loadNavData, StateUpdate, adjustState } from "./computer.actions";

/**
 * computer service to interface between captain's commands and ngrx store
 * 
 * this service is fully customizable, but all logic should be in the actions/reducers
 */
@Injectable({
    providedIn: 'root'
})
export class ComputerService{
    constructor(private store: Store<AppState>){}

    /**
     * this is called on the captain's very first voice event
     */
    public Initialize(){
        this.store.dispatch(loadNavData());
    }
    /**
     * this is called when the captain commands the computer to do one or more things
     */
    public InterpretDirectives(directives: IComputerDirective[]) {

        let stateUpdate: StateUpdate = {
            course: undefined,
            docking: undefined,
            engines: undefined,
            lasers: undefined,
            shields: undefined,
            tractorbeamEngaged: undefined
        };

        directives.forEach(x => {
                if (x.directObject == 'course') {
                    if (x.adjectivalPhrase == 'to Luna orbit')
                        stateUpdate.course = 'LunaOrbit';
                    else if (x.adjectivalPhrase == 'to the asteroid belt')
                        stateUpdate.course = 'AsteroidBelt';
                    else if (x.adjectivalPhrase == 'to LEO')
                        stateUpdate.course = 'LEO';
                } else if (x.directObject == 'shields') {
                    if (x.verb == 'disengage')
                        stateUpdate.shields = 0;
                    else if (x.adverb == 'halfway') 
                        stateUpdate.shields = 5;
                    else
                        stateUpdate.shields = 10;
                } else if (x.directObject == 'engines') {
                    if (x.verb == 'disengage')
                        stateUpdate.engines = 0;
                    else if (x.adverb == 'halfway') 
                        stateUpdate.engines = 5;
                    else if (x.adverb == 'slowly') 
                        stateUpdate.engines = 1;
                    else
                        stateUpdate.engines = 10;
                } else if (x.directObject == 'laser') {
                    if (x.verb == 'disengage')
                        stateUpdate.lasers = 0;
                    else if (x.adverb == 'halfway') 
                        stateUpdate.lasers = 5;
                    else
                        stateUpdate.lasers = 10;
                } else if (x.directObject == 'tractorbeam') {
                    stateUpdate.tractorbeamEngaged = (x.verb == 'engage');
                } else if (x.directObject == 'docking clamp') {
                    stateUpdate.docking = (x.verb == 'engage');
                }

                /*
                this.store.dispatch(
                echo(
                    {
                        message: this.directiveToMessage(x)
                    }
                )
                );
                */
        }
        );

        this.store.dispatch(
            adjustState(stateUpdate)
        );
}

    /**
     * this is a helper method to turn a computer directive into a short string
     * 
     * you can change this!
     * @param d 
     * @returns 
     */
    private directiveToMessage(d: IComputerDirective): string{
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