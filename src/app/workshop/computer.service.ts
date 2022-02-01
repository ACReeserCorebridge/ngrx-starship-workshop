import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { IComputerDirective, SolarSystemLocation } from "../challenge.service";
import { adjustDockingClamp, adjustEngines, adjustLasers, adjustShields, adjustTractorBeam, echo, loadNavData, plotCourse } from "./computer.actions";

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
        directives.forEach(x => 
            {
                if (x.directObject == 'course') {
                    let location: SolarSystemLocation = 'LEO';

                    if (x.adjectivalPhrase == 'to Luna orbit')
                        location = 'LunaOrbit';
                    else if (x.adjectivalPhrase == 'to the asteroid belt')
                        location = 'AsteroidBelt';

                    this.store.dispatch(
                        plotCourse(
                            {
                                location: location
                            }
                        )
                    );

                } else if (x.directObject == 'shields') {
                    let level: number;

                    if (x.verb == 'disengage')
                        level = 0;
                    else if (x.adverb == 'halfway') 
                        level = 5;
                    else
                        level = 10;

                    this.store.dispatch(
                        adjustShields(
                            {
                                level: level
                            }
                        )
                    );

                } else if (x.directObject == 'engines') {
                    let level: number = 0

                    if (x.verb == 'disengage')
                        level = 0;
                    else if (x.adverb == 'halfway') 
                        level = 5;
                    else if (x.adverb == 'slowly') 
                        level = 1;
                    else
                        level = 10;

                    this.store.dispatch(
                        adjustEngines(
                            {
                                level: level
                            }
                        )
                    );

                } else if (x.directObject == 'laser') {
                    let level: number = 0

                    if (x.verb == 'disengage')
                        level = 0;
                    else if (x.adverb == 'halfway') 
                        level = 5;
                    else
                        level = 10;

                    this.store.dispatch(
                        adjustLasers(
                            {
                                level: level
                            }
                        )
                    );

                } else if (x.directObject == 'tractorbeam') {
                    this.store.dispatch(
                        adjustTractorBeam(
                            {
                                engaged: (x.verb == 'engage')
                            }
                        )
                    );

                } else if (x.directObject == 'docking clamp') {
                    this.store.dispatch(
                        adjustDockingClamp(
                            {
                                docking: (x.verb == 'engage')
                            }
                        )
                    );

                } else {
                    this.store.dispatch(
                        echo(
                            {
                                message: this.directiveToMessage(x)
                            }
                        )
                    );
                }
            }
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