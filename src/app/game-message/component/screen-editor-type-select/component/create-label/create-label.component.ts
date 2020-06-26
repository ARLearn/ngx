import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {GameMessageUpdateAction} from "../../../../store/game-message.actions";
import {select, Store} from "@ngrx/store";
import {State} from "../../../../../core/reducers";
import {Observable} from "rxjs";
import { iCanWrite } from 'src/app/game-management/store/current-game.selector';

export interface Label {
    name: string;
}

@Component({
    selector: 'app-create-label',
    template: `
        <mat-form-field class="mat-form-messages add-space">
            <mat-chip-list #chipList aria-label="Fruit selection">
                <mat-chip color="accent" selected
                          *ngFor="let label of labels"
                          [selectable]="selectable"
                          [removable]="true"
                          (removed)="remove(label)">
                    {{label.name}}
                    <mat-icon matChipRemove>cancel</mat-icon>
                </mat-chip>
                <input placeholder="Labels"
                       [disabled]="!(iCanWrite|async)"
                       [matChipInputFor]="chipList"
                       [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
                       [matChipInputAddOnBlur]="addOnBlur"
                       (matChipInputTokenEnd)="add($event)">
            </mat-chip-list>
        </mat-form-field>

    `,
    styleUrls: ['./create-label.component.css']
})
export class CreateLabelComponent implements OnInit, OnChanges {


    @Input() label: string;
    labels: Label[] = [];
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    addOnBlur = true;
    selectable = true;
    public iCanWrite: Observable<boolean> = this.store.pipe(select(iCanWrite));

    constructor(
        public store: Store<State>
    ) {
    }

    ngOnInit() {
        if (this.label) {
            this.labels = this.label.split(',').map(s => {
                return {name: s};
            });
        }

    }

    ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
        if (this.label) {
            this.labels = this.label.split(',').map(s => {
                return {name: s};
            });
        }
    }

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our fruit
        if ((value || '').trim()) {
            this.labels.push({name: value.trim()});
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
        this.publishLabels();
    }

    remove(label: Label): void {
        const index = this.labels.indexOf(label);

        if (index >= 0) {
            this.labels.splice(index, 1);
        }
        this.publishLabels();
    }

    publishLabels() {
        this.store.dispatch(new GameMessageUpdateAction({label: this.labels.map(l => l.name).join(',')}));
    }

}
