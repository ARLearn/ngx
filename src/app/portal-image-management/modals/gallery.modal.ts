import {Component, OnInit} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {Subject} from "rxjs";

@Component({
    selector: 'app-gallery-modal',
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
            <div class="pos-title primary-color font-medium-32-43-roboto">Global Folders & Files</div>
            
            <app-media-gallery-container></app-media-gallery-container>
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
export class GalleryModalComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<GalleryModalComponent>) {}

    ngOnInit() {

    }

    onNoClick() {
        this.dialogRef.close();
    }
}
