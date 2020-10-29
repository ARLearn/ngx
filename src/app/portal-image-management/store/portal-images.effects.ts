import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import {delay, map, mergeMap, withLatestFrom} from "rxjs/operators";
import { forkJoin, Observable, of } from "rxjs";

import { State } from "../../core/reducers";
import {
    CreateFolder,
    CreateImage, DeleteSelectedFiles, DeleteSelectedFilesResponse,
    GoBackTo,
    GoBackToResponse,
    PortalImagesActionTypes,
    Query,
    QueryResponse, Search, SearchResponse,
    SelectFolder, SelectFolderResponse
} from "./portal-images.actions";
import { PortalImagesService } from "../../core/services/portal-images.service";
import { MediaLibraryService } from "../../core/services/medialibrary.service";
import {getSelectedFiles, getSelectedFolder} from "./portal-images.selectors";
import {MediaGalleryItem} from "./portal-images.state";


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
    search$: Observable<Action> = this.actions$.pipe(
        ofType<Search>(PortalImagesActionTypes.SEARCH),
        mergeMap((action) => this.portalImagesService.search(action.payload)),
        map(response => new SearchResponse(response as any))
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

    @Effect()
    deleteSelectedFiles$: Observable<Action> = this.actions$.pipe(
        ofType<DeleteSelectedFiles>(PortalImagesActionTypes.DELETE_SELECTED_FILES),
        withLatestFrom(this.store.select(getSelectedFiles)),
        mergeMap(([action, files]) => this.mediaLibraryService.deleteFiles(files)),
        map(() => new DeleteSelectedFilesResponse())
    );

    @Effect()
    createFolder$: Observable<Action> = this.actions$.pipe(
        ofType<CreateFolder>(PortalImagesActionTypes.CREATE_FOLDER),
        withLatestFrom(this.store.select(getSelectedFolder)),
        mergeMap(([action, folder]: [CreateFolder, MediaGalleryItem]) => {
            const path = folder ? folder.path + '/' + action.payload : 'mediaLibrary/' + action.payload;

            return forkJoin([this.mediaLibraryService.createFolder(path), of({ name: action.payload, path })])
        }),
        delay(300),
        map(([, folder]: [any, MediaGalleryItem]) => new SelectFolder(folder))
    );

    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private portalImagesService: PortalImagesService,
        private mediaLibraryService: MediaLibraryService,
    ) {
    }
}
