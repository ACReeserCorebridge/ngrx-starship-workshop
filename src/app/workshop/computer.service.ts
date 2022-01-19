import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { IComputerDirective } from "../challenge.service";
import { echo, loadNavData, plotCourse, setObjectLevel, setIsObjectActive } from "./computer.actions";

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
            let engage:boolean = false;
            let change:number = 0;
            if (x.verb === 'engage') {
                engage = true;
                if (x.adverb) {
                    switch (x.adverb) {
                        case 'fully':
                            change = 10;
                            break;
                        case 'halfway':
                            change = 5;
                            break;
                        case 'slowly':
                            change = 1
                            break;
                    }
                }
            }
            switch (x.directObject) {
                case 'shields':
                case 'engines':
                case 'laser':
                    this.store.dispatch(setObjectLevel({ object: x.directObject, level: change }))
                    break;
                case 'docking clamp':
                case 'tractorbeam':
                    this.store.dispatch(setIsObjectActive({ object: x.directObject, active: engage }))
                    break;
                case 'course':
                    if (x.adjectivalPhrase) {
                        this.store.dispatch(plotCourse({ course:  x.adjectivalPhrase }))
                    }
                    break;
            }
            this.store.dispatch(
            //TODO: you don't have to echo all the directives, do what you want!
            echo(
                {
                    message: this.directiveToMessage(x)
                }
            ))
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