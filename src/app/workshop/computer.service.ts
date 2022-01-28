import { Injectable } from "@angular/core";
import { Action, Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { Adverb, IComputerDirective, Verb } from "../challenge.service";
import { course, echo, loadNavData, power, toggle } from "./computer.actions";

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
          if (x.directObject === 'course') {
            this.store.dispatch(course({directive: x}));
          } else if (x.directObject === 'docking clamp' || x.directObject === 'tractorbeam') {
            this.store.dispatch(toggle({directive: x}));
          } else if (x.directObject === 'shields' || x.directObject === 'engines' || x.directObject === 'laser') {
            this.store.dispatch(power({directive: x}));
          }

          this.store.dispatch(echo({message: this.directiveToMessage(x)}));
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
