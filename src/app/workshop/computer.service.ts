import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { IComputerDirective } from "../challenge.service";
import { disengage, echo, half, loadNavData, plotCourse, slam, slow, toggleDocking, toggleTractor } from "./computer.actions";

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
        /** directives.forEach(x => this.store.dispatch(
          *  echo(
          *      {
          *          message: this.directiveToMessage(x)
          *      }
          *  )
          * ));
          */
        directives.forEach(command => {
            if (command.directObject == 'docking clamp') {
                this.store.dispatch(toggleDocking());
                return;
            }
            if (command.directObject == 'tractorbeam') {
                this.store.dispatch(toggleTractor());
                return;
            }
            if (command.verb == 'plot') {
                this.store.dispatch(plotCourse({
                    course: command.adjectivalPhrase!
                }));
                return;
            }
            if (command.verb == 'disengage') {
                this.store.dispatch(disengage({
                    system: command.directObject
                }));
                return;
            }
            if (command.verb == 'engage' && command.adverb! == 'fully') {
                this.store.dispatch(slam({
                    system: command.directObject
                }));
                return;
            }
            if (command.verb == 'engage' && command.adverb! == 'slowly') {
                this.store.dispatch(slow());
                return;
            }
            if (command.adverb == 'halfway') {
                this.store.dispatch(half({
                    system: command.directObject
                }));
                return;
            }
        });
    }
}
