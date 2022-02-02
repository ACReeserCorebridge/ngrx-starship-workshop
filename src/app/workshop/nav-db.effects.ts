import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, of, throwError } from "rxjs";
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
    loadNavigationData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadNavData),
      switchMap(() =>
        this.service.getNavigationData().pipe(
          map(navData => loadNavDataSuccess({ navs: navData })),
          catchError(() => throwError(loadNavDataError))
        )
      )
    )
  );
}
