import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, tap  } from 'rxjs/operators';


import * as RouterActions from '../actions/router.actions';

import { select, Store } from '@ngrx/store';
import * as fromApp from './../reducers';


@Injectable()
export class RouterEffects {
    @Effect({ dispatch: false })
    navigate$ = this.actions$.pipe(
        ofType(RouterActions.ActionTypes.GO),
        map((action: RouterActions.Go) => action.payload),
        tap(({ path, query: queryParams, extras }) =>
            this.router.navigate(path, { queryParams, ...extras })
        )
    );

    @Effect({ dispatch: false })
    navigateBack$ = this.actions$.pipe(
        ofType(RouterActions.ActionTypes.BACK),
        tap(() => this.location.back())
    );

    @Effect({ npdispatch: false })
    navigateForward$ = this.actions$.pipe(
        ofType(RouterActions.ActionTypes.FORWARD),
        tap(() => this.location.forward())
    );

    // @Effect()
    // navigateToCourse$ = this.actions$
    //     .ofType(RouterActions.ActionTypes.OPEN_COURSE)
    //     .map((action: RouterActions.OpenCourse) => action.key)
    //     .map((courseId:string) => {
    //         this.router.navigate(["/dashboard/course/" + courseId+"/page/index", {}])
    //         //return new RouterActions.OpenCourseComplete(id)
    //         return new DashboardActions.DPLoad({courseId:courseId})

    //     });

    constructor(
        private actions$: Actions,
        private router: Router,
        private store: Store<fromApp.State>,
        private location: Location
    ) { }
}
