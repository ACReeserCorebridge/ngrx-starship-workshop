import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { Adverb, IComputerDirective } from "../challenge.service";
import { NavigationData } from "../nav-db.service";
import { echo, shieldUp, enableTractorBeam, loadNavData, docking, laserUp, selectEngine, loadNavDataSuccess } from "./computer.actions";

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
            let loc: string = 'to LEO'
            let navData: NavigationData[] = [];
            if(x.adjectivalPhrase) { //'to Luna orbit'|'to the asteroid belt'|'to LEO';
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

            let verbToNum: number = 0; //'engage'|'disengage'|'plot'
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
                        navData[0].leftImage = undefined; // satelite view should be false
                        break;
                    default:
                        verbToNum = 0
                        verbToBoolean = false;
                  }
            }
            
            let adverbToNum: number = 0; //'fully'|'halfway'|'slowly';
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
                  verbToNum = adverbToNum
            }

            if(x.directObject) { //'shields'|'engines'|'laser'|'docking clamp'|'tractorbeam'|'course';
                switch(x.directObject) {
                    case 'shields':
                        this.store.dispatch(shieldUp({percentage: verbToNum}));
                        if(x.adverb == 'halfway') {
                            this.store.dispatch(laserUp({percentage: 0}));
                        }
                        if(x.adverb == 'fully') {
                            this.store.dispatch(laserUp({percentage: 0}));
                        }
                        break;
                    case 'engines':
                        this.store.dispatch(selectEngine({percentage: verbToNum}));
                        if(x.adverb == 'slowly') {
                            this.store.dispatch(laserUp({percentage: 0}));
                        }
                        break;
                    case 'laser':
                        this.store.dispatch(laserUp({percentage: verbToNum}));
                        if(x.adverb == 'halfway' && loc ==  'to the asteroid belt') {
                        }
                        break;
                    case 'docking clamp':
                        this.store.dispatch(docking({status: verbToBoolean}));
                        break;
                    case 'tractorbeam':
                        this.store.dispatch(enableTractorBeam({status: verbToBoolean}));
            
                        if(x.verb == 'engage'){
                            this.store.dispatch(selectEngine({percentage: 0})); //expectation line 139 challend.service
                        }
                        break;
                    case 'course':
                        this.store.dispatch(loadNavDataSuccess({navs: navData}));
                        if(loc == 'to the asteroid belt') {
                            this.store.dispatch(enableTractorBeam({status: false}));
                        }
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