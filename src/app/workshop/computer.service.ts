import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { IComputerDirective } from "../challenge.service";
import { 
    disengageEngines, 
    echo, 
    loadNavData, 
    plotCourseToLunaOrbit,
    engageTractorbeam,
    disengageTractorbeam,
    plotCourseToAsteroidBelt,
    halfwayEngageLaser,
    fullyEngageShields,
    disEngageShields,
    plotCourseToLeo,
    fullyEngageEngine,
    halfwayEngageShields,
    halfwayEngageEngine,
    engageEngineSlowly,
    engageDockingClamp,
    disEngageDockingClamp,
    engageEngine
} from "./computer.actions";

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

            if  (x.verb == 'engage' && x.adverb == 'slowly' && x.directObject =='engines'){
                this.store.dispatch(
                    engageEngineSlowly(
                        {
                            docking: false,
                            engine: 1,
                        }
                    )
                )    
            } else

            if  (x.verb == 'engage' && x.directObject =='engines'){
                this.store.dispatch(
                    engageEngine(
                        {
                            docking: true,
                            engine: 1,
                        }
                    )
                )    
            }

            if (x.verb == 'disengage' && x.directObject == 'docking clamp'){
                this.store.dispatch(
                    disEngageDockingClamp(
                        {
                            docking: false,
                            engine: 1,
                        }
                    )
                )    
            }

            if (x.verb == 'engage' && x.directObject == 'docking clamp'){
                this.store.dispatch(
                    engageDockingClamp(
                        {
                            docking: true,
                            engine: 0,
                        }
                    )
                )    
            }
            
            if (x.verb == 'plot' && x.directObject == 'course'){
                this.store.dispatch(
                    plotCourseToLunaOrbit(
                        {
                            course: 'LunaOrbit',
                            satelliteView: true,
                        }
                    )
                )    
            }

            if (x.verb == 'engage' && x.adverb == 'fully'){
                this.store.dispatch(
                    fullyEngageEngine(
                        {
                            engine: 10,
                        }
                    )
                )    
            }

            if (x.verb == 'disengage' && x.directObject == 'engines'){
                this.store.dispatch(
                    disengageEngines(
                        {
                            course: 'LunaOrbit',
                            engine: 0,
                            docking: true,
                        }
                    )
                )       
            }

            if (x.verb == 'engage' && x.directObject == 'tractorbeam'){
                this.store.dispatch(
                    engageTractorbeam(
                        {
                            location: 'LunaOrbit',
                            engine: 0,
                            satelliteView: true,
                            tractorbeam: true,
                            tractorView: true
                        }
                    )
                )       
            } 

            if (x.verb == 'disengage' && x.directObject == 'tractorbeam'){
                this.store.dispatch(
                    disengageTractorbeam(
                        {
                            engine: 0,
                            satelliteView: false,
                            tractorbeam: false,
                            tractorView: false
                        }
                    )
                )       
            } 

            if (x.verb == 'plot' && x.directObject == 'course' && x.adjectivalPhrase == 'to the asteroid belt'){
                this.store.dispatch(
                    plotCourseToAsteroidBelt(
                        {
                            course: 'AsteroidBelt'
                        }
                    )
                )       
            }

            if (x.verb == 'engage' && x.adverb == 'halfway' && x.directObject == 'laser'){
                this.store.dispatch(
                    halfwayEngageLaser(
                        {
                            location: 'AsteroidBelt',
                            engine: 0,
                            laser: 5,
                            shield: 5,
                            laserView: true,
                            asteroidView: false,
                        }
                    )
                )       
            }

            if (x.verb == 'engage' && x.adverb == 'fully' && x.directObject == 'shields'){
                this.store.dispatch(
                    fullyEngageShields(
                        {
                            location: 'AsteroidBelt',
                            laser: 0,
                            engine: 0,
                            shield: 10,
                            laserView: false,
                            asteroidView: false
                        }
                    )
                )       
            }

            if (x.verb == 'engage' && x.adverb == 'halfway' && x.directObject == 'engines'){
                this.store.dispatch(
                    halfwayEngageEngine(
                    {
                        engine: 5,
                        shield: 5,
                        laserView: false
                    }
                    )
                )    
            }

            if (x.verb == 'engage' && x.adverb == 'halfway' && x.directObject == 'shields'){
                this.store.dispatch(
                    halfwayEngageShields(
                        {
                            engine: 5,
                            shield: 5,
                            laserView: false,
                        }
                    )
                )       
            }

            if (x.verb == 'disengage' && x.directObject == 'shields'){
                this.store.dispatch(
                    disEngageShields(
                        {
                            shield: 0,
                        }
                    )
                )       
            }

            if (x.verb == 'plot' && x.directObject == 'course' && x.adjectivalPhrase == 'to LEO'){
                this.store.dispatch(
                    plotCourseToLeo(
                        {
                            course: 'LEO'
                        }
                    )
                )       
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