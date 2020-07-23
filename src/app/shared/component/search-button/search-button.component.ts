import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../../core/reducers";
import {SetGamesFilterAction} from "../../../games-management/store/game.actions";
import {Action} from "@ngrx/store/src/models";

@Component({
    selector: 'app-search-button',
    template: `

        <mat-form-field class="pos-field">
            <mat-label>{{'ROW_HEADERS.SEARCH' | translate}}</mat-label>
            <input matInput [placeholder]="placeholder"
                   [(ngModel)]="filter"
                   (input)="onFilterChange($event.target.value)"
            >
            <mat-icon matPrefix>search</mat-icon>
        </mat-form-field>


    `,
    styles: [`
        :host {
            //position: absolute;
            width: 100%;
            height: 35px;
            margin-top: 29px;
        }

        .pos-field {
            position: relative;
            width: 320px;
        }
    `]
})
export class SearchButtonComponent implements OnInit {

    @Input() placeholder;
    @Input() dispatchAction: FilterAction & Action;
    @Input() public filter: string;

    constructor(private store: Store<State>) {
    }

    ngOnInit(): void {
    }

    onFilterChange(filter) {
        if (filter === '') {
            this.dispatchAction.setFilter([]);
            // this.store.dispatch(new SetGamesFilterAction({filters: []}));
        } else {
            //  this.store.dispatch(new SetGamesFilterAction({filters: [filter]}));
            this.dispatchAction.setFilter([filter]);
        }
        this.store.dispatch(this.dispatchAction);
    }
}

export interface FilterAction {
    setFilter(filter: string[]);
}
