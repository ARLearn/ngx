import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../core/reducers';
import {AddGameAuthorRequestAction, LoadGameAuthorRequestAction} from '../../store/current-game.actions';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {Observable, Subscription} from 'rxjs';
import {gameAccessWithAccount} from '../../store/current-game.selector';
import {GameAuthors} from '../../store/current-game.state';
import {AddAuthorDialogComponent} from '../add-author-dialog/add-author-dialog.component';
import {PlayerLoadRequestAction} from '../../../player-management/store/player.actions';

@Component({
    selector: 'app-editor-authors',
    templateUrl: './editor-authors.component.html',
    styleUrls: ['./editor-authors.component.css']
})
export class EditorAuthorsComponent implements OnInit, OnDestroy {

    @Input() game;
    displayedColumns = ['name', 'accessRights'];
    dataSource: MatTableDataSource<GameAuthors>;
    public gameAuthors$: Observable<any[]> = this.store.pipe(select(gameAccessWithAccount));

    public subscription: Subscription;

    constructor(
        private store: Store<State>,
        public dialog: MatDialog
    ) {

    }

    ngOnInit() {
        this.store.dispatch(new LoadGameAuthorRequestAction());
        this.store.dispatch(new PlayerLoadRequestAction());
        this.subscription = this.gameAuthors$.subscribe((authors: GameAuthors[]) => {
            this.dataSource = new MatTableDataSource(authors);
        });
    }

    addAuthor() {
        const dialogRef = this.dialog.open(AddAuthorDialogComponent, {
            width: '250px',
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.store.dispatch(new AddGameAuthorRequestAction(result));
        });
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}
