import { Verb } from './../challenge.service';
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { IComputerDirective } from "../challenge.service";
import { disengageDockingClamp, echo, loadNavData, slowlyEngageEngine } from "./computer.actions";
/**
 * computer service to interface between captain's commands and ngrx store
 *
 * this service is fully customizable, but all logic should be in the actions/reducers
 */
@Injectable({
  providedIn: 'root'
})
export class ComputerService {

  constructor(private store: Store<AppState>) { }

  /**
   * this is called on the captain's very first voice event
   */
  public Initialize() {
    this.store.dispatch(loadNavData());
  }
  /**
   * this is called when the captain commands the computer to do one or more things
   */
  public InterpretDirectives(directives: IComputerDirective[]) {

    directives.forEach((directive: IComputerDirective) => {
      const command = [directive.adverb, directive.verb, directive.directObject, directive.adjectivalPhrase].filter(Boolean).join(' ');
      this.store.dispatch({ type: `[computer] ${command}` });
      this.store.dispatch(echo({ message: this.directiveToMessage(directive) }));
    });
  }

  /**
   * this is a helper method to turn a computer directive into a short string
   *
   * you can change this!
   * @param d
   * @returns
   */
  private directiveToMessage(d: IComputerDirective): string {
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
