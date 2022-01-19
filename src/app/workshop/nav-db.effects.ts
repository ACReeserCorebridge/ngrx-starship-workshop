import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, of, exhaustMap } from "rxjs";
import { NavDBService, NavigationData } from "../nav-db.service";
import { loadNavData, loadNavDataError, loadNavDataSuccess } from "./computer.actions";

@Injectable()
export class NavDBEffects{
    constructor(
      private actions$: Actions,
      private service: NavDBService
    ){}

    loadNavigationData$ = createEffect(() =>
      this.actions$.pipe(
          ofType(loadNavData),
          exhaustMap(action => this.service.getNavigationData()
            .pipe(
              map(data => loadNavDataSuccess({navs: data})),
              catchError(err => of(loadNavDataError({error: err})))
            )
        )
    ));
}