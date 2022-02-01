import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { IComputerDirective, SolarSystemLocation } from "../challenge.service";
import { disengageDock, disengageEngines, disengageLasers, disengageShields, disengageTractorBeam, echo, engageDock, engageEngines, engageLasers, engageShields, engageTractorBeam, loadNavData, plotCourse } from "./computer.actions";

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

          let power:number = x.verb == 'engage' ? 10 : 0;
          switch(x.adverb) {
            case "fully":
              power = 10;
            break;
            case "halfway":
              power = 5;
            break;
            case "slowly":
              power = 1;
            break;
          }

          switch(x.directObject) {
            case "shields":
              if (x.verb == 'engage') {
                this.store.dispatch(engageShields({ power: power }));
              } else if (x.verb == 'disengage') {
                this.store.dispatch(disengageShields({ power: power }));
              }
              break;
            case "engines":
              if (x.verb == 'engage') {
                this.store.dispatch(engageEngines({ power: power }));
              } else if (x.verb == 'disengage') {
                this.store.dispatch(disengageEngines({ power: power }));
              }
              break;
            case "laser":
              if (x.verb == 'engage') {
                this.store.dispatch(engageLasers({ power: power }));
              } else if (x.verb == 'disengage') {
                this.store.dispatch(disengageLasers({ power: power }));
              }
              break;
            case "docking clamp":
              if (x.verb == 'engage') {
                this.store.dispatch(engageDock());
              } else if (x.verb == 'disengage') {
                this.store.dispatch(disengageDock());
              }
              break;
            case "tractorbeam":
              if (x.verb == 'engage') {
                this.store.dispatch(engageTractorBeam());
              } else if (x.verb == 'disengage') {
                this.store.dispatch(disengageTractorBeam());
              }
              break;
            case "course":
              let location:SolarSystemLocation = 'LEO';
              switch(x.adjectivalPhrase) {
                case "to Luna orbit":
                  location = 'LunaOrbit';
                break;
                case "to the asteroid belt":
                  location = 'AsteroidBelt';
                break;
                case "to LEO":
                  location = 'LEO';
                break;
              }
              this.store.dispatch(plotCourse({ goto: location }));
              break;
          }

          this.store.dispatch(
            echo(
                {
                    message: this.directiveToMessage(x)
                }
            )
          );
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
