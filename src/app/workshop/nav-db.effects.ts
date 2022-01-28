import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, of, from } from "rxjs";
import { NavDBService, NavigationData } from "../nav-db.service";
import { loadNavData, loadNavDataError, loadNavDataSuccess } from "./computer.actions";

@Injectable()
export class NavDBEffects{
    constructor(
      private actions$: Actions,
      private service: NavDBService
    ){}

    loadNavData$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loadNavData),
        switchMap(() =>
          from(this.service.getNavigationData()).pipe(
            map((navData: NavigationData[]) => loadNavDataSuccess({navs: navData})),
            catchError((error) => of(loadNavDataError))
          )
        )
      )
    )
}