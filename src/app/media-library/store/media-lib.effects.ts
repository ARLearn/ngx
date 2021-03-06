import {Router} from '@angular/router';
import {Action, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {State} from 'src/app/core/reducers';

import {debounceTime, delay, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {
    GetGameMessagesCompletedAction,
    GetGameMessagesRequestAction
} from "../../game-messages/store/game-messages.actions";
import * as selector from "../../core/selectors/router.selector";
import {
    CreateFolderCompletedAction,
    GetFolderListCompletedAction,
    GetFolderListRequestAction,
    MediaLibraryActionTypes, UploadCompletedAction
} from "./media-lib.actions";
import {MediaLibraryService} from "../../core/services/medialibrary.service";
import {
    filesAvailableForUploading,
    getMediaLibFeature,
    getRelativePath,
    getSelectedFiles,
    nextFileForUploading
} from "./media-lib.selector";
import {FileToUpload} from "./media-lib.state";


@Injectable()
export class MediaLibraryEffects {
    constructor(
        private medialib: MediaLibraryService,
        private actions$: Actions,
        private router: Router,
        private store$: Store<State>
    ) {
    }

    @Effect()
    loadFolders$: Observable<Action> = this.actions$.pipe(
        ofType(MediaLibraryActionTypes.GET_FOLDER_LIST_REQUESTED, MediaLibraryActionTypes.SET_RELPATH),
        withLatestFrom(
            this.store$.select(selector.selectRouteParam('gameId')),
            this.store$.select(getRelativePath)
        ),
        filter(([, gameId]) => !!gameId),
        switchMap(
            ([action, gameId, path]: [GetGameMessagesRequestAction, string, string]) =>
                this.medialib.getGameFiles(gameId || action.payload.gameId, path).pipe(
                    map(res =>
                        new GetFolderListCompletedAction(
                            {folders: res.folder, items: res.items}
                        )
                    )
                )
        )
    );


    @Effect()
    deleteFiles: Observable<Action> = this.actions$.pipe(
        ofType(MediaLibraryActionTypes.DELETE_SELECT_FILE),
        withLatestFrom(
            this.store$.select(selector.selectRouteParam('gameId')),
            this.store$.select(getSelectedFiles)
        ),
        switchMap(
            ([action, gameId, files]: [GetGameMessagesRequestAction, string, string[]]) =>
                this.medialib.deleteGameFiles(gameId || action.payload.gameId, files).pipe(
                    map(res =>
                        new GetFolderListRequestAction(
                        )
                    )
                )
        )
    );
    // @Effect({dispatch: false})
    // createFolder: Observable<Action> = this.actions$.pipe(
    //     ofType(MediaLibraryActionTypes.CREATE_FOLDER),
    //     withLatestFrom(
    //         this.store$.select(selector.currentGameId),
    //         this.store$.select(getRelativePath)
    //     ),
    //     map(
    //         ([action, gameId, path]: [GetGameMessagesRequestAction, number, string]) => {
    //             return this.medialib.createFolder(gameId || action.payload.gameId, path, action.payload.name);
    //         }
    //     ),
    //     tap(console.log)
    // );

    @Effect({ dispatch: false })
    startUpload = this.actions$.pipe(
        ofType(MediaLibraryActionTypes.START_UPLOAD, MediaLibraryActionTypes.UPDATE_UPLOAD),

        withLatestFrom(
            this.store$.select(filesAvailableForUploading)
        ),
        tap(x => console.log("restart called", x)),
        debounceTime(200),
        filter(x => x[1]),
        tap(x => console.log("restart called")),
        withLatestFrom(
            this.store$.select(nextFileForUploading)
        ),
        map(f => {
            const ftu: FileToUpload = f[1];
            console.log("file to up", ftu.file.name);
            if (ftu.customPath) {
                return this.medialib.upload(ftu.file, ftu.pathPrefix);
            } else {
                return this.medialib.upload(ftu.file, ftu.pathPrefix + '/' + ftu.file.name);
            }

        }),
        withLatestFrom(
            this.store$.select(nextFileForUploading)
        ),
        tap((x) => {
            this.store$.dispatch(new UploadCompletedAction(x[1]));
        }),
    );
}
