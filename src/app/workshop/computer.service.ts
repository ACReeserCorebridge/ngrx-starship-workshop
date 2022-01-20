import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { IComputerDirective, DirectObject } from "../challenge.service";
import { ComputerActions } from "./action-types";
import { echo, loadNavData } from "./computer.actions";
import { DirectObjectTypes } from "./direct-object-types";

/**
 * computer service to interface between captain's commands and ngrx store
 *
 * this service is fully customizable, but all logic should be in the actions/reducers
 */
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
        directives.forEach(directive => {
            this.store.dispatch(
                //TODO: you don't have to echo all the directives, do what you want!
                ComputerActions.echo({ message: this.directiveToMessage(directive) }),
            );

            if (directive.directObject == DirectObjectTypes.DockingClamp) {
                this.store.dispatch(ComputerActions.switchDockingClamp({ enable: directive.verb == "engage" }))
            }

            if (directive.directObject == DirectObjectTypes.TractorBeam) {
                this.store.dispatch(ComputerActions.switchTractorBeam({ enable: directive.verb == "engage" }))
            }

            if (directive.directObject == DirectObjectTypes.Engines) {
              this.store.dispatch(ComputerActions.changeEngine({ directive }))
            }

            if (directive.directObject == DirectObjectTypes.Engines) {
                this.store.dispatch(ComputerActions.changeEngine({ directive }))
            }

            if(directive.directObject == DirectObjectTypes.Shields) {
              this.store.dispatch(ComputerActions.changeShields({ directive }))
            }

            if(directive.directObject == DirectObjectTypes.Laser) {
              this.store.dispatch(ComputerActions.changeLaser({ directive }))
            }

            if(directive.directObject == DirectObjectTypes.Course) {
              this.store.dispatch(ComputerActions.changeCourse({ directive }))
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
