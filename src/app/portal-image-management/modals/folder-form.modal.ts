import {Component, OnInit} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {Subject} from "rxjs";

@Component({
    selector: 'app-folder-form',
    template: `
        <div class="maxwidth pos-top">
            <app-modal-esc-button
                    class="gl-pos-modal-esc-button"
                    [type]="'esc'" (buttonClick)="onNoClick()"></app-modal-esc-button>
            <app-modal-esc-button
                    class="gl-pos-modal-back-button"
                    [type]="'back'" (buttonClick)="onNoClick()"></app-modal-esc-button>
        </div>
        <div class="maxwidth">
            <div class="pos-title primary-color font-medium-32-43-roboto">Create Folder</div>
            
            <form class="image-form" #form="ngForm" (ngSubmit)="form.valid && onSubmit()">
                <div class="form">
                    <div>
                        <mat-form-field class="field">
                            <mat-label>Name</mat-label>
                            <input type="text" matInput [(ngModel)]="name" name="name" required
                                   pattern="[\\w\\s]+"/>
                            <mat-error>Name is invalid</mat-error>
                        </mat-form-field>
                    </div>
                </div>
                <div class="center btn-container">
                    <button type="submit" mat-flat-button color="primary">{{ 'BTN.SUBMIT' | translate }}</button>
                </div>
            </form>
        </div>
    `,
    styles: [`
    .pos-top {
      height: 1px;
    }
    .pos-title {
      position: relative;
      margin-top: 83px;
      height: 38px;
      text-align: center;
    }
    
    .field {
        width: 100%;
    }
    
    .btn-container {
        margin-top: 1rem;
    }
    
    .image-form {
        margin: 120px auto;
        width: 360px;
    }
    
    .center {
        text-align: center;
    }
    `
    ]
})
export class FolderFormModalComponent implements OnInit {
    name: string;

    private submit$ = new Subject();

    get submit() {
        return this.submit$.asObservable();
    }


    constructor(public dialogRef: MatDialogRef<FolderFormModalComponent>) {}

    ngOnInit() {

    }

    onNoClick() {
        this.dialogRef.close();
    }

    onSubmit() {
        this.submit$.next(this.name);
    }
}
