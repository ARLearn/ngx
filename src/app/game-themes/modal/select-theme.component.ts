import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";

@Component({
  selector: 'app-select-theme',
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
      <div class="pos-title primary-color font-medium-32-43-roboto">Maak je thema compleet</div>

    </div>
    
    <p>
      todo work out
      https://xd.adobe.com/view/9d07f717-73fe-425f-6643-cb780b3d6d20-eb36/screen/30c97da5-8371-41bc-94f0-67c25853aa9c/specs/
    </p>
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
  `]
})
export class SelectThemeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SelectThemeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public store: Store<State>) {
  }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
