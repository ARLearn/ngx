import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../../core/reducers";
import {Observable} from "rxjs";
import {Game} from "../../../game-management/store/current-game.state";
import {getGame} from "../../../game-management/store/current-game.selector";
import {getSelectedFiles} from "../../store/media-lib.selector";
import {DeleteSelectFileAction} from "../../store/media-lib.actions";

@Component({
    selector: 'app-library-footer',
    template: `
        <div class="maxwidth">
            <div class="parent">
                <mat-chip-list aria-label="Fish selection" style="margin-top:4px;margin-right:10px">
                    <mat-chip color="primary" selected>{{(selectFiles|async).length}}</mat-chip>
                </mat-chip-list>
                <div class="selected-text">geselecteerd</div>
                <div class="example-box" *ngFor="let selected of (selectFiles|async)">
                    <app-filestore-background-image
                            [paths]="['/game/'+(game$|async)?.gameId+'/'+selected]"
                    ></app-filestore-background-image>
                    
                </div>
            </div>
            <div class="delete-button">
                <button 
                        (click)="deleteSelected()"
                        class="delete-button-text" mat-button color="primary"
                >
                    <mat-icon>delete</mat-icon>
                    verwijderen
                </button>
            </div>
        </div>
    `,
    styles: [`
        .parent {
            position: absolute;
            top: 16px;
            height: 40px;
            display: flex;
            flex-direction: row;
            height: 100%;
        }

        .selected-text {
            text-align: left;
            margin-top: 12px;
            margin-right: 28px;
            font: Medium 12px/20px Roboto;
            letter-spacing: 0;
            color: #20272B;
            text-transform: uppercase;
            opacity: 1;
        }

        .example-box {
            width: 28px;
            height: 40px;
            background: #E4E9EB 0% 0% no-repeat padding-box;
            opacity: 1;
            backdrop-filter: blur(2px);
            -webkit-backdrop-filter: blur(2px);
            margin-left: 10px;
        }

        .delete-button {
            position: absolute;
            right: 0px;
            top: 18px;
            
        }
        .delete-button-text {
          text-align: left;
          font: Medium 12px/20px Roboto;
          letter-spacing: 0;
          color: #D50380;
          text-transform: uppercase;
          opacity: 1;
        }
    `]
})
export class LibraryFooterComponent implements OnInit {
    public selectFiles: Observable<any> = this.store.select(getSelectedFiles);
    public game$: Observable<Game> = this.store.select(getGame);


    constructor(
        public store: Store<State>
    ) {
    }

    ngOnInit(): void {
    }

    deleteSelected() {
        this.store.dispatch(new DeleteSelectFileAction());
    }

}
