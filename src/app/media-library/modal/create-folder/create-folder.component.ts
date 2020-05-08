import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {State} from "../../../core/reducers";

@Component({
    selector: 'app-create-folder',
    template: `
        <h1 mat-dialog-title>Nieuwe folder </h1>
        <form >
            <mat-form-field class="form-field" >
                <mat-label>Folder name</mat-label>
                <input matInput placeholder="photo" type="text" [(ngModel)]="value" [ngModelOptions]="{standalone: true}">
            </mat-form-field>


        </form>
        <div class="button-row">
            <button mat-raised-button color="primary" (click)="createFolder()">
                CREATE
            </button>
            <button mat-button color="primary" (click)="onNoClick()">
                CANCEL
            </button>
        </div>

    `,
    styles: [`
        .form-field {
            width: 100%;
            
        }

        .button-row {
            /*width: 100%;*/
            display: flex;
            flex-direction: row-reverse;
        }
    `]
})
export class CreateFolderComponent implements OnInit {
    value: string;

    constructor(public dialogRef: MatDialogRef<CreateFolderComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                public store: Store<State>) {
    }

    ngOnInit() {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    createFolder() {
        console.log(this.value)
        this.dialogRef.close({name: this.value});
    }
}
