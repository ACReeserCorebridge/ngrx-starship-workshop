import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { Adverb, IComputerDirective } from "../challenge.service";
import { NavigationData } from "../nav-db.service";
import { echo, toggleShield, toggleTractorBeam, loadNavData, toggleDocking, toggleLaser, selectEngine, loadNavDataSuccess } from "./computer.actions";

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
            this.store.dispatch(
                echo(
                    {
                        message: this.directiveToMessage(x)
                    }
                )
            )

            /**
             * assign value to navData based on adjectivalPhrase
             * cases: 'to Luna orbit'|'to the asteroid belt'|'to LEO';
             */
            let navData: NavigationData[] = [];
            if(x.adjectivalPhrase) { 
                switch(x.adjectivalPhrase) {
                    case 'to Luna orbit':
                        navData = [{
                            location: 'LunaOrbit',
                            leftImage: '/assets/satellite.png',
                            centerImage: '/assets/luna.png',
                            rightImage: undefined,
                        }];
                        break;
                    case 'to the asteroid belt':
                        navData = [{
                            location: 'AsteroidBelt',
                            leftImage: '/assets/asteroid.png',
                            centerImage: '/assets/asteroid.gif',
                            rightImage: '/assets/asteroid.png',
                        }];
                        break;
                    case 'to LEO':
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

            /**
             * convert verb to number/boolean for later use on the components
             * cases 'engage'|'disengage'|'plot'
             */
            let verbToNum: number = 0; 
            let verbToBoolean: boolean = false;
            if(x.verb){
                switch(x.verb) {
                    case 'disengage':
                        verbToNum = 0;
                        verbToBoolean = false;
                        break;
                    case 'plot':
                        verbToNum = 10;
                        verbToBoolean = true;
                        break;
                    case 'engage':
                        verbToNum = 10;
                        verbToBoolean = true;
                        break;
                    default:
                        return;
                  }
            }
            
            /**
             * convert adverb to number for later use on the components
             * also assigned this after the verb because adverb needs to override verb
             * cases 'fully'|'halfway'|'slowly'
             */
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
                        return;
                  }
                  verbToNum = adverbToNum //override verb value
            }

            /**
             * dispatch depending on directObject
             * cases: 'shields'|'engines'|'laser'|'docking clamp'|'tractorbeam'|'course';
             */
            if(x.directObject) {
                switch(x.directObject) {
                    case 'shields':
                        this.store.dispatch(toggleShield({percentage: verbToNum}));
                        if(x.adverb == 'fully') { //need to disable laser when shield is full
                            this.store.dispatch(toggleLaser({percentage: 0}));
                        }
                        break;
                    case 'docking clamp':
                        this.store.dispatch(toggleDocking({status: verbToBoolean}));
                        break;
                    case 'engines':
                        this.store.dispatch(selectEngine({percentage: verbToNum}));
                        break;
                    case 'laser':
                        this.store.dispatch(toggleLaser({percentage: verbToNum}));
                        if(x.adverb == 'halfway'){
                            navData = [{
                                location: 'AsteroidBelt',
                                leftImage: '/assets/asteroid.png',
                                centerImage: undefined,
                                rightImage: '/assets/asteroid.png',
                            }];
                            this.store.dispatch(loadNavDataSuccess({navs: navData}));
                        }
                        break;
                    case 'tractorbeam':
                        this.store.dispatch(toggleTractorBeam({status: verbToBoolean}));
                        if(x.verb == 'disengage'){
                            navData = [{
                                location: 'LunaOrbit',
                                leftImage: undefined,
                                centerImage: '/assets/luna.png',
                                rightImage: undefined,
                            }];
                            this.store.dispatch(loadNavDataSuccess({navs: navData}));
                        }
                        break;
                    case 'course':
                        this.store.dispatch(loadNavDataSuccess({navs: navData}));
                        break;
                    default:
                        return;
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