import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { IComputerDirective } from "../challenge.service";
import { ComputerActions } from "./action-types";
import { DirectObjectTypes } from "./direct-object-types";

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
        this.store.dispatch(ComputerActions.loadNavData());
    }
    /**
     * this is called when the captain commands the computer to do one or more things
     */
    public InterpretDirectives(directives: IComputerDirective[]) {
        this.store.dispatch(
            //TODO: you don't have to echo all the directives, do what you want!
            ComputerActions.echo({ directives }),
        );

        //TODO: decide which actions to dispatch based on the directives passed in!
        directives.forEach(directive => {
            switch (directive.directObject) {
                case DirectObjectTypes.DockingClamp:
                    this.store.dispatch(ComputerActions.switchDockingClamp({ enable: directive.verb == "engage" }))
                    break;

                case DirectObjectTypes.TractorBeam:
                    this.store.dispatch(ComputerActions.switchTractorBeam({ enable: directive.verb == "engage" }))
                    break;

                case DirectObjectTypes.Engines:
                    this.store.dispatch(ComputerActions.changeEngine({ directive }))
                    break;

                case DirectObjectTypes.Shields:
                    this.store.dispatch(ComputerActions.changeShields({ directive }))
                    break;

                case DirectObjectTypes.Laser:
                    this.store.dispatch(ComputerActions.changeLaser({ directive }))
                    break;

                case DirectObjectTypes.Course:
                    this.store.dispatch(ComputerActions.changeCourse({ directive }))
                    break;
            }
        });
    }
}
