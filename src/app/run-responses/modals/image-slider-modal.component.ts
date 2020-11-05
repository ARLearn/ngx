import { Component, HostListener, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";

import { State } from "../../core/reducers";
import { Game } from "../../game-management/store/current-game.state";
import { getGame } from "../../game-management/store/current-game.selector";
import { getCurrentGameMessages, getSelectedScreen } from "../../game-messages/store/game-messages.selector";
import { filter, map, withLatestFrom } from "rxjs/operators";

@Component({
    selector: 'app-image-slider-modal',
    template: `
    <div class="maxwidth pos-top">
      <app-modal-esc-button
          class="gl-pos-modal-esc-button"
          [type]="'esc'" (buttonClick)="onNoClick()"></app-modal-esc-button>
      <app-modal-esc-button
          class="gl-pos-modal-back-button"
          [type]="'back'" (buttonClick)="onNoClick()"></app-modal-esc-button>
    </div>
    <div class="maxwidth" #parent>
        <div class="pos-title primary-color font-medium-32-43-roboto">
            {{ (game$ | async)?.title }}
        </div>

        <div class="pos-description primary-color font-regular-24-24-roboto">
            {{ description$ | async }} {{ currentIdx }}
        </div>

        <div>
            <div class="img">
                <img [src]="images[currentIdx]" alt="" />

                <button [hidden]="isFirst" class="go-back" mat-icon-button (click)="prevImage()"><mat-icon>chevron_left</mat-icon></button>
                <button [hidden]="isLast" class="go-next" mat-icon-button (click)="nextImage()"><mat-icon>chevron_right</mat-icon></button>
            </div>
        </div>
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
    
    .pos-description {
        margin-top: 20px;
        text-align: center;
    }
        
    .img {
        position: relative;
        width: 440px;
        margin: 40px auto;
        padding: 3px;
        background: #ffffff;
    }
    
    .mat-icon-button.go-back .mat-icon,
    .mat-icon-button.go-next .mat-icon {
        font-size: 40px;
        line-height: unset;
        height: unset;
        width: unset;
    }
    
    .go-back {
        position: absolute;
        left: -60px;
        top: 50%;
        transform: translateY(-50%);
    }
    .go-next {
        position: absolute;
        right: -60px;
        top: 50%;
        transform: translateY(-50%);
    }

    .img img {
        width: 100%;
        height: 100%;
    }
  `]
})
export class ImageSliderModalComponent implements OnDestroy {
    public game$: Observable<Game> = this.store.select(getGame);

    public description$ = this.store.select(getSelectedScreen).pipe(
        withLatestFrom(this.store.select(getCurrentGameMessages)),
        map(([screen, messages]) => messages.find(x => x.id === screen)),
        filter((x) => !!x),
        map((message) => message.name)
    );

    public images = [];
    public currentIdx = 0;

    get isFirst() {
        return this.currentIdx === 0;
    }

    get isLast() {
        return this.currentIdx === this.images.length - 1;
    }

    private subscription = new Subscription();

    constructor(public dialogRef: MatDialogRef<ImageSliderModalComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                public store: Store<State>) {
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onNoClick() {
        this.dialogRef.close();
    }

    @HostListener('window:keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        if (event.code === 'ArrowLeft') {
            this.prevImage();
        }
        if (event.code === 'ArrowRight') {
            this.nextImage();
        }
    }

    prevImage() {
        if (this.isFirst) { return; }
        this.currentIdx--;
    }

    nextImage() {
        if (this.isLast) { return; }
        this.currentIdx++;
    }
}
