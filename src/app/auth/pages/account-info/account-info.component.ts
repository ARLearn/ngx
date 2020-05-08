import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../../core/reducers";
import {ChangeAccountAction} from "../../store/auth.actions";

@Component({
    selector: 'app-account-info',
    template: `
        <div class="example-container">
            <mat-form-field>
                <input matInput placeholder="Jouw naam" [(ngModel)]="name">
            </mat-form-field>
        </div>
        <button mat-raised-button (click)="send()">Aanpassen</button>
    `,
    styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

    name: string;

    constructor(
        private store: Store<State>
    ) {
    }

    ngOnInit() {
    }

    send() {
        console.log("name is", this.name);
        this.store.dispatch(new ChangeAccountAction({name: this.name}));
    }
}
