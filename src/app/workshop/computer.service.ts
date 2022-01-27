import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { Adverb, IComputerDirective } from "../challenge.service";
import { NavigationData } from "../nav-db.service";
import { echo, toggleShield, toggleTractorBeam, loadNavData, toggleDocking, useLaser, selectEngine, loadNavDataSuccess } from "./computer.actions";

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
            //assign value to navData based on adjectivalPhrase
            //cases: 'to Luna orbit'|'to the asteroid belt'|'to LEO';
            let loc: string = 'to LEO'
            let navData: NavigationData[] = [];
            if(x.adjectivalPhrase) { 
                switch(x.adjectivalPhrase) {
                    case 'to Luna orbit':
                        loc = 'to Luna orbit';
                        navData = [{
                            location: 'LunaOrbit',
                            leftImage: '/assets/satellite.png',
                            centerImage: '/assets/luna.png',
                            rightImage: undefined,
                        }];
                        break;
                    case 'to the asteroid belt':
                        loc = 'to the asteroid belt';
                        navData = [{
                            location: 'AsteroidBelt',
                            leftImage: '/assets/asteroid.png',
                            centerImage: '/assets/asteroid.gif',
                            rightImage: '/assets/asteroid.png',
                        }];
                        break;
                    case 'to LEO':
                        loc = 'to LEO';
                        navData = [{
                            location: 'LEO',
                            leftImage: undefined,
                            centerImage: '/assets/planet.png',
                            rightImage: '/assets/spaceStation.png',
                        }];
                        break;
                    default:
                        return;
                  }
            }

            //convert verb to number/boolean
            // cases 'engage'|'disengage'|'plot'
            let verbToNum: number = 0; 
            let verbToBoolean: boolean = false;
            if(x.verb){
                switch(x.verb) {
                    case 'engage':
                        verbToNum = 10;
                        verbToBoolean = true;
                        break;
                    case 'plot':
                        verbToNum = 10;
                        verbToBoolean = true;
                        break;
                    case 'disengage':
                        verbToNum = 10;
                        verbToBoolean = true;
                        navData[0].leftImage = undefined; //satelite view should always be false when disengaged
                        break;
                    default:
                        verbToNum = 0
                        verbToBoolean = false;
                  }
            }
            
            //convert adverb to number
            //cases: 'fully'|'halfway'|'slowly'
            let adverbToNum: number = 0; 
            if(x.adverb){
                switch(x.adverb) {
                    case 'fully':
                        adverbToNum = 10;
                        break;
                    case 'halfway':
                        adverbToNum = 5;
                        break;
                    case 'slowly':
                        adverbToNum = 1;
                        break;
                    default:
                        adverbToNum = 0
                  }
                  verbToNum = adverbToNum //verb should be dependent to adverb
            }

            if(x.directObject) { //'shields'|'engines'|'laser'|'docking clamp'|'tractorbeam'|'course';
                switch(x.directObject) {
                    case 'shields':
                        this.store.dispatch(toggleShield({percentage: verbToNum}));

                        if(x.adverb == 'halfway') this.store.dispatch(useLaser({percentage: 0}));
                        if(x.adverb == 'fully') this.store.dispatch(useLaser({percentage: 0}));
                        break;
                    case 'engines':
                        this.store.dispatch(selectEngine({percentage: verbToNum}));

                        if(x.adverb == 'slowly') this.store.dispatch(useLaser({percentage: 0}));
                        break;
                    case 'laser':
                        this.store.dispatch(useLaser({percentage: verbToNum}));
                        break;
                    case 'docking clamp':
                        this.store.dispatch(toggleDocking({status: verbToBoolean}));
                        break;
                    case 'tractorbeam':
                        this.store.dispatch(toggleTractorBeam({status: verbToBoolean}));
            
                        if(x.verb == 'engage') this.store.dispatch(selectEngine({percentage: 0})); //expectation on line 139 of challenge.service
                        break;
                    case 'course':
                        this.store.dispatch(loadNavDataSuccess({navs: navData}));

                        if(loc == 'to the asteroid belt') this.store.dispatch(toggleTractorBeam({status: false})); //expectation on line 173 of challenge.service
                        break;
                    default:
                        return;
                  }
            }

            this.store.dispatch(
                echo(
                    {
                        message: this.directiveToMessage(x)
                    }
                )
            )
        }); //endOf foreach
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