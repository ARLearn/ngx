import {Router} from '@angular/router';
import {Action, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import * as actions from './media-lib.actions';
import * as actions_current from '../../game-management/store/current-game.actions';

import {State} from 'src/app/core/reducers';

import {catchError, debounceTime, delay, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {SetErrorAction} from '../../shared/store/shared.actions';
import {AuthActionTypes} from '../../auth/store/auth.actions';
import {
    GameMessagesActionTypes,
    GetGameMessagesCompletedAction,
    GetGameMessagesRequestAction
} from "../../game-messages/store/game-messages.actions";
import * as selector from "../../core/selectors/router.selector";
import {
    CreateFolderCompletedAction,
    GetFolderListCompletedAction,
    GetFolderListRequestAction,
    MediaLibraryActionTypes
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
            this.store$.select(selector.currentGameId),
            this.store$.select(getRelativePath)
        ),
        switchMap(
            ([action, gameId, path]: [GetGameMessagesRequestAction, number, string]) =>
                this.medialib.getFiles(gameId || action.payload.gameId, path).pipe(
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
            this.store$.select(selector.currentGameId),
            this.store$.select(getSelectedFiles)
        ),
        switchMap(
            ([action, gameId, files]: [GetGameMessagesRequestAction, number, string[]]) =>
                this.medialib.deleteFiles(gameId || action.payload.gameId, files).pipe(
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

    @Effect({dispatch: false})
    startUpload: Observable<Action> = this.actions$.pipe(
        ofType(MediaLibraryActionTypes.START_UPLOAD, MediaLibraryActionTypes.UPDATE_UPLOAD),
        withLatestFrom(
            this.store$.select(filesAvailableForUploading)
        ),
        debounceTime(200),
        filter(x => x[1]),
        tap(x => console.log("restart called")),
        withLatestFrom(
            this.store$.select(nextFileForUploading)
        ),
        map(f => {
            const ftu: FileToUpload = f[1];
            console.log("file to up", ftu.file.name);
            return this.medialib.upload(ftu.file, ftu.pathPrefix);
        }),

        tap(console.log)
    );
}
