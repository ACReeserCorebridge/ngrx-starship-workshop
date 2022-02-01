import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { Adverb, IComputerDirective, SolarSystemLocation } from "../challenge.service";
import { echo, engageEngines, engageLasers, engageShields, engageTractorBeam, loadNavData, plotCourse } from "./computer.actions";

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
        //TODO: decide which actions to dispatch based on the directives passed in!
        directives.forEach((x, index) => {
            echo({ message: this.directiveToMessage(x) });
            const powerAmount: string = x.adverb || x.verb;

            if (x.directObject === 'engines') {
                if (x.adverb === 'slowly' && index == 1) return;
                this.store.dispatch(engageEngines({engine: power[powerAmount]}))
            }

            if (x.directObject === 'laser') {
                this.store.dispatch(engageLasers({laser: power[powerAmount]}))
            }

            if (x.directObject === 'shields') {
                this.store.dispatch(engageShields({shield: power[powerAmount]}))
            }

            if (x.directObject === 'course') {
                this.handleCoursePlotting(x)
            }

            if (x.directObject === 'tractorbeam') {
                this.store.dispatch(engageTractorBeam({ tractorbeam: x.verb === 'engage'}));
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

    private handleCoursePlotting({adjectivalPhrase}: IComputerDirective) {
        let course: SolarSystemLocation = 'LEO';

        if (adjectivalPhrase === 'to Luna orbit') {
            course = 'LunaOrbit';
        } else if (adjectivalPhrase === 'to the asteroid belt') {
            course = 'AsteroidBelt'
        }

        this.store.dispatch(plotCourse({course}))
    }
} 

const power: {[key: string]: number} = {
    'fully': 10,
    'halfway': 5,
    'slowly': 1,
    'disengage': 0,
}