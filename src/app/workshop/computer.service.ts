import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { IComputerDirective, IExpectations } from "../challenge.service";
import { command, disengageEngine, echo, loadNavData, plotCourse } from "./computer.actions";

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
        // directives.forEach(x => this.store.dispatch(
        //     //TODO: you don't have to echo all the directives, do what you want!
        //     echo(
        //         {
        //             message: this.directiveToMessage(x)
        //         }
        //     )
        // ));
        directives.forEach(x => {
          switch(x.verb)
          {
            case 'engage':
              this.store.dispatch(command({expectation: this.engage(x), message: this.directiveToMessage(x)}));
              break;
            case 'disengage':
              if (x.directObject == 'engines')
                this.store.dispatch(disengageEngine({directive: x, message: this.directiveToMessage(x)}));
              else
                this.store.dispatch(command({expectation: this.disengage(x), message: this.directiveToMessage(x)}));
              break;
            case 'plot':
              if (x.directObject == 'course')
                this.store.dispatch(plotCourse({directive: x, message: this.directiveToMessage(x)}));
              break;
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

    private engage(d: IComputerDirective): IExpectations{
      let expectation: IExpectations = {};
      let increment: number = d.adverb == 'fully' ? 10 : (d.adverb == 'halfway' ? 5 : 1);
      switch(d.directObject) {
        case 'docking clamp':
          expectation.docking = true;
          break;
        case 'engines':
          expectation.engine = increment;
          break;
        case 'laser':
          expectation.laser = increment;
          expectation.laserView = true;
          expectation.asteroidView = false;
          break;
        case 'shields':
          expectation.shield = increment;
          expectation.laser = 0;
          expectation.laserView = false;
          break;
        case 'tractorbeam':
          expectation.tractorbeam = true;
          expectation.tractorView = true;
          break;
      }
      return expectation;
    }

    private disengage(d: IComputerDirective): IExpectations{
      let expectation: IExpectations = {};
      switch(d.directObject) {
        case 'docking clamp':
          expectation.docking = false;
          break;
        case 'laser':
          expectation.laser = 0;
          expectation.laserView = false;
          break;
        case 'shields':
          expectation.shield = 0;
          break;
        case 'tractorbeam':
          expectation.tractorbeam = false;
          expectation.tractorView = false;
          expectation.satelliteView = false;
          break;
      }
      return expectation;
    }
}
