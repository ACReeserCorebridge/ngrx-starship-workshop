import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { IComputerDirective, SolarSystemLocation } from "../challenge.service";
import { activateDockingClamp, activateLaser, activateShield, activateTractorBeam, deactivateLaser, deactivateShield, deactivateTractorBeam, disengageEngine, echo, engageEngine, loadNavData, plotCourse } from "./computer.actions";

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
    public InterpretDirectives(directives: IComputerDirective[]){
        directives.forEach(x => {
            this.store.dispatch(echo({message: this.directiveToMessage(x)}));

            switch(x.directObject) {
                case 'shields':
                    if (x.verb == 'engage')
                        this.store.dispatch(activateShield({adverb: x.adverb}));
                    else if (x.verb == 'disengage')
                        this.store.dispatch(deactivateShield());
                    break;
                case 'engines':
                    if (x.verb == 'engage')
                        this.store.dispatch(engageEngine({adverb: x.adverb}));
                    else if (x.verb == 'disengage')
                        this.store.dispatch(disengageEngine());
                    break;
                case 'laser':
                    if (x.verb == 'engage')
                        this.store.dispatch(activateLaser({adverb: x.adverb}));
                    else if (x.verb == 'disengage')
                        this.store.dispatch(deactivateLaser());
                    break;
                case 'docking clamp':
                    this.store.dispatch(activateDockingClamp(x));
                    break;
                case 'tractorbeam':
                    if (x.verb == 'engage')
                        this.store.dispatch(activateTractorBeam());
                    else if (x.verb == 'disengage')
                        this.store.dispatch(deactivateTractorBeam());
                    break;
                case 'course':
                    switch (x.adjectivalPhrase) {
                        case 'to LEO':
                            this.store.dispatch(plotCourse({course: 'LEO'}));
                            break;
                        case 'to Luna orbit':
                            this.store.dispatch(plotCourse({course: 'LunaOrbit'}));
                            break;
                        case 'to the asteroid belt':
                            this.store.dispatch(plotCourse({course: 'AsteroidBelt'}));
                    }
            }
        });
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