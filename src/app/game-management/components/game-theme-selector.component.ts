import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {SelectThemeComponent} from "../../game-themes/modal/select-theme.component";
import {Query} from "../../game-themes/store/game-theme.actions";

@Component({
    selector: 'app-game-theme-selector',
    template: `

        <button mat-raised-button (click)="openSelectModal()">Select theme</button>
    `,
    styles: []
})
export class GameThemeSelectorComponent implements OnInit {

    constructor(
        private store: Store<State>,
                public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.store.dispatch(new Query());
    }

    openSelectModal() {
        const dialogRef = this.dialog.open(SelectThemeComponent, {
            panelClass: ['modal-fullscreen', "modal-dialog"],
            data: {}
        });
    }
}
