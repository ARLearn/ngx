import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import {map, mergeMap, withLatestFrom} from "rxjs/operators";
import { forkJoin, Observable, of } from "rxjs";

import { State } from "../../core/reducers";
import {
    CreateImage,
    GoBackTo,
    GoBackToResponse,
    PortalImagesActionTypes,
    Query,
    QueryResponse,
    SelectFolder, SelectFolderResponse
} from "./portal-images.actions";
import { PortalImagesService } from "../../core/services/portal-images.service";
import { MediaLibraryService } from "../../core/services/medialibrary.service";
import {getSelectedFolder} from "./portal-images.selectors";


@Injectable()
export class PortalImagesEffects {

    @Effect()
    query$: Observable<Action> = this.actions$.pipe(
        ofType<Query>(PortalImagesActionTypes.QUERY),
        mergeMap((action) =>
            forkJoin([this.mediaLibraryService.getFiles(action.payload && action.payload.path.replace('mediaLibrary/', '')), of(action)])
        ),
        map(([response, action]: any) => {
            if (action.isGoBack) {
                this.store.dispatch(new GoBackToResponse(action.payload));
            } else {
                this.store.dispatch(new SelectFolderResponse(action.payload));
            }

            return new QueryResponse({
                folders: response.folder,
                files: response.items,
                selectedFolder: action.payload,
            });
        }),
    );

    @Effect()
    selectFolder$: Observable<Action> = this.actions$.pipe(
        ofType<SelectFolder>(PortalImagesActionTypes.SELECT_FOLDER),
        map((action) => new Query(action.payload, false)),
    );

    @Effect()
    goBackTo$: Observable<any> = this.actions$.pipe(
        ofType<GoBackTo>(PortalImagesActionTypes.GO_BACK_TO),
        map((action) => new Query(action.payload, true)),
    );

    @Effect()
    create$: Observable<Action> = this.actions$.pipe(
        ofType<CreateImage>(PortalImagesActionTypes.CREATE),
        mergeMap((action: CreateImage) => this.portalImagesService.create(action.payload)),
        withLatestFrom(this.store.select(getSelectedFolder)),
        map(([, folder]) => new Query(folder, false))
    );

    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private portalImagesService: PortalImagesService,
        private mediaLibraryService: MediaLibraryService,
    ) {
    }
}
