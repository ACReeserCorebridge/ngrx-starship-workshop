import { verifyHostBindings } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { IComputerDirective, Verb, Adverb, DirectObject, AdjPhrase, SolarSystemLocation } from "../challenge.service";
import { echo, loadNavData, setDockingClamp, setEnginePower, setLaserPower, setShieldPower, setTractorBeam, setTractorView, setViewScreenState } from "./computer.actions";

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
        directives.forEach(x => this.store.dispatch(
            echo(
                {
                    message: this.directiveToMessage(x)
                }
            )
        ));
        directives.forEach(directive => 
            {
                switch(directive.verb) 
                {
                    case 'engage':
                        var power:number = 1; //slowly
                        if (directive.adverb == 'fully') power = 10;
                        if (directive.adverb == 'halfway') power = 5;                    
                        switch(directive.directObject) {
                            case 'shields':
                                this.store.dispatch(setShieldPower({value: power}));
                                break;
                            case 'laser':
                                this.store.dispatch(setLaserPower({value: power}));
                                break;
                            case 'engines':
                                this.store.dispatch(setEnginePower({value: power}));
                                break;
                            case 'tractorbeam':
                                this.store.dispatch(setTractorBeam({value: true}));
                                break;
                            case 'docking clamp':
                                this.store.dispatch(setDockingClamp({value: true}))
                                break;
                        }
                    break;
                    case 'disengage':
                        switch(directive.directObject) {
                            case 'shields':
                                this.store.dispatch(setShieldPower({value: 0}));
                                break;
                            case 'laser':
                                this.store.dispatch(setLaserPower({value: 0}));
                                break;
                            case 'engines':
                                this.store.dispatch(setEnginePower({value: 0}));
                                break;
                            case 'tractorbeam':
                                this.store.dispatch(setTractorBeam({value: false}));
                                break;
                            case 'docking clamp':
                                this.store.dispatch(setDockingClamp({value: false}))
                                break;
                        }
                    break;
                    case 'plot':
                        if (directive.directObject==='course') {
                            switch (directive.adjectivalPhrase) {
                                case 'to Luna orbit':                                
                                    this.store.dispatch(setViewScreenState({value: 'LunaOrbit'}));
                                    break;
                                case 'to the asteroid belt':                                
                                    this.store.dispatch(setViewScreenState({value: 'AsteroidBelt'}));
                                    break;
                                case 'to LEO':                                
                                    this.store.dispatch(setViewScreenState({value: 'LEO'}));
                                break;
                            }
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