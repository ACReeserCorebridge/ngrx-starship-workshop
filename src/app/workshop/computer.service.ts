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
        //TODO: decide which actions to dispatch based on the directives passed in!

        directives.forEach(x => {
            let verbToNum: number = 0;
            if(x.verb == 'engage')
                verbToNum = 10;

            let verbToBoolean: boolean = false;
            if(x.verb == 'engage')
                verbToBoolean = true;
            
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
                        adverbToNum = 3
                        break;
                    default:
                        adverbToNum = 0
                  }
            }

            if(x.directObject === 'tractorbeam'){
                this.store.dispatch(enableTractorBeam({status: verbToBoolean}));

                if(!verbToBoolean){
                    this.store.dispatch(loadNavDataSuccess({navs: [{
                        location: 'LunaOrbit',
                        leftImage: undefined,
                        centerImage: '/assets/luna.png',
                        rightImage: undefined
                    }]}
                ));
                }
            }
            if(x.directObject === 'shields'){
                this.store.dispatch(shieldUp({percentage: verbToNum}));
            }
            
            if(x.directObject === 'laser'){
                if(x.adverb){
                    verbToNum = adverbToNum;
                }
                this.store.dispatch(laserUp({percentage: verbToNum}));
                if(verbToBoolean){ //if laser is engaged
                    // this.store.dispatch(shieldUp({percentage: 10}));
                    this.store.dispatch(loadNavDataSuccess({navs: [{
                            location: 'AsteroidBelt',
                            leftImage: '/assets/asteroid.png',
                            centerImage: undefined,
                            rightImage: '/assets/asteroid.png'
                        }]}
                    ));
                }
            }

            if(x.directObject === 'docking clamp'){
                this.store.dispatch(docking({status: verbToBoolean}));
            }
            if(x.directObject === 'engines'){
                if(x.adverb){
                    verbToNum = adverbToNum;
                }
                // this.store.dispatch(laserUp({percentage: adverbToNum}));
                this.store.dispatch(shieldUp({percentage: verbToNum}));
                this.store.dispatch(selectEngine({percentage: verbToNum}));
            }

            if(x.adjectivalPhrase == 'to Luna orbit') {
                this.store.dispatch(loadNavDataSuccess({navs: [{
                        location: 'LunaOrbit',
                        leftImage: '/assets/satellite.png',
                        centerImage: '/assets/luna.png',
                        rightImage: undefined
                    }]}
                ));
            }
            if(x.adjectivalPhrase == 'to the asteroid belt') {
                this.store.dispatch(loadNavDataSuccess({navs: [{
                        location: 'AsteroidBelt',
                        leftImage: '/assets/asteroid.png',
                        centerImage: '/assets/asteroid.gif',
                        rightImage: '/assets/asteroid.png'
                    }]}
                ));
                this.store.dispatch(laserUp({percentage: 0}));
            }

            this.store.dispatch(
                //TODO: you don't have to echo all the directives, do what you want!
                echo(
                    {
                        message: this.directiveToMessage(x)
                    }
                )
            )
        }); //end of foreach
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