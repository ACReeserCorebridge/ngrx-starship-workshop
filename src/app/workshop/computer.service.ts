import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { Adverb, IComputerDirective } from "../challenge.service";
import * as actions from "./computer.actions";

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
        this.store.dispatch(actions.loadNavData());
    }
    /**
     * this is called when the captain commands the computer to do one or more things
     */
    public InterpretDirectives(directives: IComputerDirective[]){
        directives.forEach(x => {
            this.store.dispatch(
            //TODO: you don't have to echo all the directives, do what you want!
            actions.echo(
                {
                    message: this.directiveToMessage(x)
                }
                ), 
            );
            switch (x.directObject) {
                case 'shields': {
                    if (x.verb === 'engage')
                        this.store.dispatch(
                            actions.engageShield({
                                shield: this.adverbToNumber(x.adverb)
                            })
                        );
                    else 
                         this.store.dispatch(
                            actions.disengageShield()
                         );
                         break;
                }
                case 'engines': {
                    if (x.verb === 'engage')
                    this.store.dispatch(
                        actions.engageEngine({
                            power: this.adverbToNumber(x.adverb)
                        })
                    );
                    else
                        this.store.dispatch(
                            actions.disengageEngine()
                        );
                        break;
                }
                case 'docking clamp': {
                    if (x.verb === 'engage')
                        this.store.dispatch(
                            actions.engageDockClamp()
                        );
                    else
                        this.store.dispatch(
                            actions.disengageDockClamp()
                        );
                        break;
                }
                case 'course': {
                    if (x.verb === 'plot' && x.adjectivalPhrase)
                        this.store.dispatch(
                            actions.plotCourse({
                                location: x.adjectivalPhrase
                            })
                        );
                    break;
                }
                case 'laser': {
                    if (x.verb === 'engage')
                        this.store.dispatch(
                            actions.engageLaser({
                                power: this.adverbToNumber(x.adverb)
                            })
                        );
                    else
                        this.store.dispatch(
                            actions.disengageLaser()
                        );
                    break;
                
                }
                case 'tractorbeam': {
                    if (x.verb === 'engage')
                        this.store.dispatch(
                            actions.engageTractorBeam()
                        );
                    else
                        this.store.dispatch(
                            actions.disengageTractorBeam()
                        );
                    break;
                
                }
                default:
                    break;

                } 
            }   
        );
    }

    /**
     * Helper method to convert adverb to a number
     * @param adverb
     * @returns pct: number
     */
    private adverbToNumber(adverb?: Adverb): number{
        switch (adverb) {
            case 'fully':
                return 10;
            case 'halfway':
                return 5;
            case 'slowly':
                return 1;
            default:
                return 0;
        }
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