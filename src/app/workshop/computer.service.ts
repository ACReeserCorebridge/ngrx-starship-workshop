import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { IComputerDirective } from "../challenge.service";
import { echo, toggleTractorBeam, activateShield, loadNavDataSuccess, toggleDocking, activateLaser, activateEngine, loadNavData } from "./computer.actions";
import { NavigationData } from "../nav-db.service";

/**
 * computer service to interface between captain's commands and ngrx store
 *
 * this service is fully customizable, but all logic should be in the actions/reducers
 */
@Injectable({
    providedIn: 'root'
})
export class ComputerService{

  private localNavData: NavigationData[] = [];

  private intensityDict = {
    'stop': 0,
    'slowly': 1,
    'halfway': 5,
    'fully': 10
  }


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
      );
      if (x.adjectivalPhrase) {
        this.initNavigationalData(x.adjectivalPhrase)
      }

      let state = false;
      if (x.verb) {
        state = this.getStateByVerbAndObject(x.verb, x.directObject);
      }

      this.dispatchChanges(x, state)
    });
  }

  private dispatchChanges(x: IComputerDirective, state: boolean) {
    let navData: NavigationData[] = [];
    switch(x.directObject) {
      case 'shields':
        navData = JSON.parse(JSON.stringify(this.localNavData));
        navData[0].centerImage = undefined;
        this.store.dispatch(activateShield({ armour: this.intensityDict[x.adverb ? x.adverb : 'stop'], navs: navData }));
        break;

      case 'engines':
        if (this.localNavData != null && this.localNavData.length > 0) {
          navData = JSON.parse(JSON.stringify(this.localNavData));
          navData[0].centerImage = '/assets/asteroid.gif';
        }
        this.store.dispatch(activateEngine({ speed: this.intensityDict[x.adverb ? x.adverb : 'stop'], navs: navData }));
        break;

      case 'laser':
        if (this.localNavData != null && this.localNavData.length > 0) {
          navData = JSON.parse(JSON.stringify(this.localNavData));
          navData[0].centerImage = undefined;
        }
        this.store.dispatch(activateLaser({ intensity: this.intensityDict[x.adverb ? x.adverb : 'stop'], navs:navData }));
        break;

      case 'docking clamp':
        this.store.dispatch(toggleDocking({ engaged: state }));
        break;

      case 'tractorbeam':
        if (x.verb == 'disengage') {
          navData = JSON.parse(JSON.stringify(this.localNavData));
          navData[0].leftImage = undefined;
        }
        this.store.dispatch(toggleTractorBeam({ status: state, navs:navData }));
        break;

      case 'course':
        this.store.dispatch(loadNavDataSuccess({ navs: JSON.parse(JSON.stringify(this.localNavData)), armour: 0 }));
        break;
    }
  }


  private getStateByVerbAndObject(verb:string, directObject: string): boolean {
    switch (verb) {
      case 'engage':
      case 'plot':
        return true;

      case 'disengage':
       return directObject == 'docking clamp' || directObject == 'tractorbeam' ? false : true;
    }
    return false;
  }
  private initNavigationalData(phrase: string) {
    let navData: NavigationData[] = [];
    switch(phrase) {
      case 'to Luna orbit':
        navData = [{
          location: 'LunaOrbit',
          leftImage: '/assets/satellite.png',
          centerImage: '/assets/luna.png',
          rightImage: undefined,
        }];
        this.localNavData = JSON.parse(JSON.stringify(navData));
        break;
      case 'to the asteroid belt':
        navData = [{
          location: 'AsteroidBelt',
          leftImage: '/assets/asteroid.png',
          centerImage: '/assets/asteroid.gif',
          rightImage: '/assets/asteroid.png',
        }];
        this.localNavData = JSON.parse(JSON.stringify(navData));
        break;
      case 'to LEO':
        navData = [{
          location: 'LEO',
          leftImage: undefined,
          centerImage: '/assets/planet.png',
          rightImage: '/assets/spaceStation.png',
        }];
        this.localNavData = JSON.parse(JSON.stringify(navData));
        break;
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
