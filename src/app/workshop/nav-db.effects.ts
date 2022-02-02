import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, of, mergeMap } from "rxjs";
import { NavDBService, NavigationData } from "../nav-db.service";
import { loadNavData, loadNavDataError, loadNavDataSuccess } from "./computer.actions";

@Injectable()
export class NavDBEffects{
    constructor(
      private actions$: Actions,
      private service: NavDBService
    ){}

    //TODO: make the effect work!
    // https://ngrx.io/guide/effects/operators is a good reference
     loadNavigationData$ = createEffect(() => this.actions$.pipe(
       ofType('[computer] Load Navigation Data'),
       mergeMap(() => this.service.getNavigationData()
       .pipe(
         map(navigationData => ({type: '[computer] Load Navigation Data Success', navs : navigationData})),
         catchError(() => of({type: '[computer] Load Navigation Data Error'}))
         ))
     )
    //TODO: do something with this.actions$
    //TODO: do something with loadNavData
    //TODO: do something with this.service.getNavigationData()
    //TODO: do something with loadNavDataSuccess
    //TODO: do something with loadNavDataError
     );
}