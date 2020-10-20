import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Store} from "@ngrx/store";
import { State } from "../../../core/reducers";
import { Subject } from "rxjs";
import { AngularFireStorage } from "angularfire2/storage";

@Component({
  selector: 'app-create-theme-name-modal',
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
      <div class="pos-title primary-color font-medium-32-43-roboto">{{ 'THEME.CREATE_THEME' | translate }}</div>
      
      <form class="form" #form="ngForm" (ngSubmit)="form.valid && onSubmit()">
        <mat-form-field class="name-input">
          <mat-label>{{ 'NAME' | translate }}</mat-label>
          <input type="text" matInput name="name" [(ngModel)]="name" required />
        </mat-form-field>
        
        <div>
          <button type="submit" mat-raised-button color="primary">{{ 'BTN.SAVE' | translate }}</button>
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
    
    .form {
      margin-top: 200px;
      text-align: center;
    }
    
    .name-input {
      width: 300px;
    }
  `]
})
export class CreateThemeNameModalComponent implements OnInit, OnDestroy {

  public name: string;

  private submit$: Subject<{ name: string }> = new Subject<{ name: string }>();

  get submit() {
    return this.submit$.asObservable();
  }

  constructor(public dialogRef: MatDialogRef<CreateThemeNameModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public store: Store<State>,
              private afStorage: AngularFireStorage) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {

  }

  onNoClick() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.submit$.next({ name: this.name });
  }
}
