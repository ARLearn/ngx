import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-new-game-entry-screen',
    template: `
        <div class="maxwidth">
            <app-modal-esc-button
                    class="gl-pos-modal-esc-button"
                    [type]="'esc'" (buttonClick)="esc.emit()"></app-modal-esc-button>
        </div>
        <div class="maxwidth">
            <!--                <app-modal-esc-button-->
            <!--                        class="pos-esc-button"-->
            <!--                        [type]="'esc'" (buttonClick)="esc.emit()"></app-modal-esc-button>-->
            <div class="pos-scratch-button-row">
                <button
                        class="pos-button gl-style-stroke-button"
                        mat-button (click)="startFromScratch()">
                    <div class="pos-icon-in-button primary-background-color">
                        <mat-icon class="pos-icon white-color">add</mat-icon>
                    </div>

                    <div class="pos-button-text contrast-color-50pct font-medium-14-20-roboto">{{ 'GAME.NEW_GAME_SCRATCH' | translate }}</div>
                </button>
            </div>
            <div class="pos-title primary-color font-medium-32-43-roboto">{{ 'GAME.NEW_GAME_TITLE' | translate }}</div>
<!--            <div class="pos-subtitle contrast-color-50pct font-regular-17-13-roboto">{{ 'GAME.NEW_GAME_SUBTITLE' | translate }}</div>-->
            <app-game-patterns-container class="pos-tiles">tiles</app-game-patterns-container>
        </div>
    `,
    styles: [`
        .pos-scratch-button-row {
            position: relative;
            margin-top: 28px;
            height: 44px;
        }

        .pos-button {
            position: absolute;
            right: 0px;
            width: 236px;
            height: 44px
        }

        .pos-button-text {
            position: absolute;
            left: 0px;
            top: 11px;
            width: 202px;
            text-align: center;
            text-transform: uppercase;
        }

        .pos-icon-in-button {
            position: absolute;
            right: 18px;
            top: 13px;
            width: 18px;
            height: 18px;
            border-radius: 50%;
        }

        .pos-icon {
            position: absolute;
            top: -1px;
            right: -3px;
            font-size: 20px;
        }

        .pos-title {
            position: relative;
            margin-top: 11px;
            height: 38px;
            text-align: center;
        }

        .pos-subtitle {
            position: relative;
            margin-top: 18px;
            height: 23px;
            text-align: center;
        }

        /*.pos-tiles {*/
        /*    position: relative;*/
        /*    margin-top: 38px;*/
        /*    width: 100%;*/
        /*}*/
    `]
})
export class NewGameEntryScreenComponent implements OnInit {

    @Output() clickEvent = new EventEmitter();
    @Output() esc = new EventEmitter();

    constructor() {
    }

    ngOnInit(): void {
    }

    startFromScratch() {
        this.clickEvent.emit();
    }

}
