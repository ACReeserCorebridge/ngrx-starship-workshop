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

    // https://ngrx.io/guide/effects/operators is a good reference
    loadNavigationData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadNavData),
            exhaustMap(() =>
                this.service.getNavigationData().pipe(
                    map(data => loadNavDataSuccess({ navs: data })),
                    catchError(() => of(loadNavDataError)) // does this actually work? 🤷‍♂️
                )
            )
        )
    );
}
