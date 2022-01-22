import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { IComputerDirective } from "../challenge.service";
import { echo, shieldUp, enableTractorBeam, loadNavData, docking, laserUp, selectEngine } from "./computer.actions";

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

        console.log('directiveeee', directives);
        directives.forEach(x => {
            if(x.directObject === 'tractorbeam'){
                this.store.dispatch(enableTractorBeam({status: true}));
            }
            if(x.directObject === 'shields'){
                this.store.dispatch(shieldUp());
            }
            if(x.directObject === 'docking clamp'){
                this.store.dispatch(docking({status: true}));
            }
            if(x.directObject === 'laser'){
                this.store.dispatch(laserUp());
            }
            if(x.directObject === 'engines'){
                this.store.dispatch(selectEngine());
            }

            this.store.dispatch(
            //TODO: you don't have to echo all the directives, do what you want!
            echo(
                {
                    message: this.directiveToMessage(x)
                }
            )
        )
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