import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {GameMessage} from '../../game-messages/store/game-messages.state';
import {map} from 'rxjs/operators';
import {AngularFireStorage, AngularFireUploadTask} from "angularfire2/storage";
import Storage = firebase.storage.Storage;

import {from} from 'rxjs';
import {Store} from "@ngrx/store";
import {State} from "../reducers";
import {GetFolderListRequestAction, StartUploadAction, UpdateUpload} from "../../media-library/store/media-lib.actions";
import {concatMap} from "rxjs-compat/operator/concatMap";
import {switchMap} from "rxjs-compat/operator/switchMap";

@Injectable()
export class MediaLibraryService {

    constructor(
        public store$: Store<State>,
        private afStorage: AngularFireStorage) {
    }

    getGameFiles(gameId: string, path): Observable<any> {
        // this.afStorage.ref('game').child(`${gameId}`).listAll().then(x => console.log(x));
        const storage: Storage = this.afStorage.storage;
        return from(storage.ref('game').child(`${gameId}${path}`).listAll())
            .pipe(map(res => {
                const returnObject = {folder: [], items: []};
                res.prefixes.forEach(function (folderRef) {
                    returnObject.folder.push(folderRef.name);
                });
                res.items.forEach(function (itemRef) {
                    returnObject.items.push(itemRef.name);
                });

                return returnObject;
            }));
    }

    getFiles(path = null): Observable<any> {
        // this.afStorage.ref('game').child(`${gameId}`).listAll().then(x => console.log(x));
        const storage: Storage = this.afStorage.storage;
        let stream$: Observable<any>;

        if (path) {
            storage.ref('mediaLibrary').child(path);
            stream$ = from(storage.ref('mediaLibrary').child(path).listAll());
        } else {
            stream$ = from(storage.ref('mediaLibrary').listAll());
        }

        return stream$.pipe(map(res => {
            const returnObject = {folder: [], items: []};

            res.prefixes.forEach(function (folderRef) {
                returnObject.folder.push({ name: folderRef.name, path: folderRef.fullPath });
            });

            res.items.forEach(async function (itemRef) {
                if (itemRef.name && itemRef.name !== 'removeme.txt') {
                    const meta = (await itemRef.getMetadata()).customMetadata;
                    returnObject.items.push({ name: itemRef.name, path: itemRef.fullPath, assetId: meta ? meta.assetId : null });
                }
            });

            return returnObject;
        }));
    }

    updateFileMetadata(file: { path: string, assetId: string }): Observable<any[]> {
        const storage: Storage = this.afStorage.storage;
        return from(storage.ref(file.path).updateMetadata({ customMetadata: { assetId: file.assetId } }));
    }

    deleteFiles(files: string[]): Observable<any[]> {
        const storage: Storage = this.afStorage.storage;
        const batch = files.map((path) => {
            return from(storage.ref(path).delete());
        });
        return forkJoin(batch);
    }

    async deleteFolder(folder: string) {
        const storage: Storage = this.afStorage.storage;

        return this.deleteRecursively(storage.ref(folder));
    }

    private async deleteRecursively(listRef) {
        const storage: Storage = this.afStorage.storage;
        const data = await listRef.listAll();


        for (const storageElement of data.prefixes) {
            await this.deleteRecursively(storageElement);
        }

        for (const item of data.items) {
            await storage.ref(item['location']['path']).delete();
        }
    }

    deleteGameFiles(gameId: string, files: String[]): Observable<any[]> {
        files.forEach((file) => console.log("deleting ", file));
        const storage: Storage = this.afStorage.storage;
        const batch = files.map((path) => {
            return from(storage.ref('game').child(`${gameId}/${path}`).delete());
        });
        return forkJoin(batch);
    }

    createFolder(path) {
        const blob = new Blob([], { type: 'plain/text' });

        return this.afStorage.upload(`/${path}/removeme.txt`.replace('//', '/'), blob);
    }

    createGameFolder(gameId: number, path, name) {
        // this.afStorage.ref('game').child(`${gameId}`).listAll().then(x => console.log(x));
        console.log("creating ", `/game/${gameId}${path}/${name}/removeme.txt`.replace('//', '/'));
        this.afStorage.upload(`/game/${gameId}${path}/${name}/removeme.txt`.replace('//', '/'), "removeme.txt");
    }


    upload(file: File, path: string) {
        const task: AngularFireUploadTask = this.afStorage.upload(path, file);
        return task.percentageChanges().subscribe((value: number) => {
            this.store$.dispatch(new UpdateUpload({
                filename: file.name,
                value: value,
                completed: (value >= 100)
            }));
            if (value >= 100) {
                this.store$.dispatch(new StartUploadAction());
                setTimeout(() => {
                    this.store$.dispatch(new GetFolderListRequestAction());
                }, 1000);

            }
        });
    }

}
