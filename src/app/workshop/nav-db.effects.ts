import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, of } from "rxjs";
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
        switchMap(() => this.service.getNavigationData().pipe(
          map((navData: NavigationData[]) => loadNavDataSuccess({navs: navData})),
          catchError(() => of(loadNavDataError()))
        ))
      )
    );
}