import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-friend-add-dialog',
    template: `
        <div class="maxwidth pos-top">
            <app-modal-esc-button
                    class="gl-pos-modal-esc-button"
                    [type]="'esc'" (buttonClick)="onNoClick()"></app-modal-esc-button>
        </div>
        <div class="maxwidth">
            <div class="pos-title primary-color font-medium-32-43-roboto">{{ 'CONTACT.ADD' | translate }}</div>
            <div class="pos-inner-block">
                <mat-form-field class="pos-email-field font-regular-16-24-roboto ">
                    <input 
                           matInput placeholder="{{ 'CONTACT.EMAIL' | translate }}"
                           [type]="'text'" [(ngModel)]="data.email">
                </mat-form-field>
                
                <mat-checkbox
                        class="pos-checkbox font-regular-16-24-roboto"
                        [(ngModel)]="data.addpers" >{{ 'CONTACT.ADD_PERSONAL' | translate }}</mat-checkbox>
                <mat-form-field class="pos-textarea" *ngIf="data.addpers">
                    <mat-label>{{ 'CONTACT.ADD_PERSONAL_MESSAGE' | translate }}</mat-label>
                    <textarea matInput [(ngModel)]="data.note"></textarea>
                </mat-form-field>

                <button class="pos-create-button gl-style-button-no-shadow font-medium-14-20-roboto"
                        mat-raised-button
                        [disabled]="data.email.length < 2"
                        color="primary" [mat-dialog-close]="data">{{ 'CONTACT.INVITE' | translate }}</button>
            </div>
        </div>

        <!--        <h1 mat-dialog-title>{{'CONTACT.ADD'|translate}}</h1>-->
        <!--        <div mat-dialog-content>-->
        <!--            <mat-form-field  class="form-field">-->
        <!--                <input matInput [(ngModel)]="data.email" placeholder="{{'CONTACT.EMAIL'|translate}}">-->
        <!--            </mat-form-field>-->
        <!--        </div>-->
        <!--        <div class="button-row">-->

        <!--            <button mat-button (click)="onNoClick()">{{'CONFIG.CANCEL'|translate}}</button>-->
        <!--            <button mat-button [mat-dialog-close]="data" cdkFocusInitial>{{'CONTACT.INVITE'|translate}}</button>-->
        <!--        </div>-->

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

        .pos-inner-block {
            position: relative;
            width: 320px;
            left: 50%;
            transform: translate(-50%, 0%);
        }

        .pos-email-field {
            position: relative;
            margin-top: 141px;
            width: 100%;
        }
        
        .pos-checkbox{
            position: relative;
            margin-top: 38px;
            color: #00000061;

        }

        .pos-textarea {
            position: relative;
            margin-top: 38px;
            width: 100%;
        }

        .pos-create-button {
            position: relative;
            margin-top: 37px;

            width: 100%;
            height: 44px;
        }


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
export class FriendAddDialogComponent {
    @Output() esc = new EventEmitter();

    constructor(
        public dialogRef: MatDialogRef<FriendAddDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
