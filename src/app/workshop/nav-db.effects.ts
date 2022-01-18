import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, of, concatMap } from "rxjs";
import { NavDBService, NavigationData } from "../nav-db.service";
import { ComputerActions } from "./action-types";

@Injectable()
export class NavDBEffects {
  constructor(
    private actions$: Actions,
    private service: NavDBService
  ) { }

  //TODO: make the effect work!
  // https://ngrx.io/guide/effects/operators is a good reference
  loadNavigationData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ComputerActions.loadNavData),
      switchMap(action =>
        this.service.getNavigationData().pipe(
          map(navigationDataArray => ComputerActions.loadNavDataSuccess({ navs: navigationDataArray })),
          catchError(() => of(ComputerActions.loadNavDataError()))
        ))
    )
  );
}