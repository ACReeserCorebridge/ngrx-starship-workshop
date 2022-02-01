import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, of, exhaustMap, tap, share } from "rxjs";
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
    // loadNavigationData$ = createEffect(() =>
    //TODO: do something with this.actions$
    //TODO: do something with loadNavData
    //TODO: do something with this.service.getNavigationData()
    //TODO: do something with loadNavDataSuccess
    //TODO: do something with loadNavDataError
    // );

    loadNavigationData$ = createEffect(() => {
          return this.actions$.pipe(
            // filter out the actions, except for `[Customers Page] Opened`
            ofType(loadNavData),
            exhaustMap(() =>
              // call the service
              this.service.getNavigationData().pipe(
                // return a Success action when the HTTP request was successfull (`[computer] Load Navigation Data Success`)
                map((data) => loadNavDataSuccess({ navs: data })),
                // return a Failed action when something went wrong during the HTTP request (`[computer] Load Navigation Data Error`)
              catchError((error) => {
                console.log(error.message);
                return of(loadNavDataError())
              }))
            )
          )});     
}