import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, of } from "rxjs";
import { NavDBService } from "../nav-db.service";
import { loadNavData, loadNavDataError, loadNavDataSuccess, beforePlot, plot } from "./computer.actions";

@Injectable()
export class NavDBEffects {
    constructor(
        private actions$: Actions,
        private service: NavDBService
    ) { }

    loadNavigationData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadNavData),
            switchMap(action => this.service.getNavigationData().pipe(
                map(navs => loadNavDataSuccess({ navs: navs.filter(a => a.location === 'LEO')[0] }),
                catchError(error => of(loadNavDataError())))
            ))
        )
    );

    beforePlot$ = createEffect(() =>
        this.actions$.pipe(
            ofType(beforePlot),
            switchMap(action => this.service.getNavigationData().pipe(
                map(navs => plot({ currentLocation: navs.filter(a => a.location === action.course)[0] }),
                catchError(error => of(loadNavDataError())))
            ))
        )
    );
}