import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {ResetGameMessageEditAction} from "../../../../game-message/store/game-message.actions";
import {Store} from "@ngrx/store";
import {State} from "../../../../core/reducers";

@Component({
    selector: 'app-hover-overlay',
    template: `
        <div class="outer-container">
            <div [ngClass]="menuOpen? ['pos-override-overlay', 'style-overlay']:['pos-overlay','style-overlay']">
                <div class="pos-actions-button">
                    <button mat-icon-button [matMenuTriggerFor]="appMenu2"
                            (menuOpened)="openMenu(true)"
                            (menuClosed)="openMenu(false)"
                    >
                        <mat-icon class="white-color">more_horiz</mat-icon>
                    </button>
                    <mat-menu #appMenu2="matMenu" yPosition="below">
                        <button  *ngFor="let action of actionText; let i = index" mat-menu-item (click)="actionClicked.emit(action)">
                            <mat-icon>delete_forever</mat-icon>
                            <span class="style-uppercase">{{ action | translate }}</span>
                        </button>
                    </mat-menu>
                </div>
                <div class="pos-middle-button-container">
                    <button
                            [routerLink]="navTo"
                            (click)="reset()"
                            color="white"
                            class="pos-middle-button" mat-stroked-button>
                        {{clickText | translate}}
                    </button>
                </div>
            </div>
            <ng-content></ng-content>
        </div>
    `,
    styles: [`
        .pos-middle-button-container > .mat-stroked-button {
            border: 1px solid white;
        }

        .outer-container {
            position: absolute;
            height: 307px;
            width: 100%;
        }

        .pos-overlay {
            position: absolute;
            display: none;
            z-index: 10;
            width: 100%;
            height: 100%;
        }

        .pos-override-overlay {
            position: absolute;
            display: block;
            z-index: 10;
            width: 100%;
            height: 100%;
        }

        .outer-container:hover .pos-overlay {
            display: block;
        }

        .pos-middle-button-container {
            position: absolute;
            width: 100%;
            top: 154px;
            color: white;
        }

        .pos-middle-button {
            left: 50%;
            transform: translate(-50%);
        }

        .style-overlay {
            background: rgba(0, 0, 0, 0.4) 0% 0% no-repeat padding-box;
            border-radius: 2px 2px 0px 0px;
            opacity: 0.8;
            backdrop-filter: blur(2px);
            -webkit-backdrop-filter: blur(2px);
        }

        .pos-actions-button {
            z-index: 5;
            right: 0px;
            position: absolute;

        }

        .style-uppercase {
            text-transform: uppercase;
        }
    `]
})
export class HoverOverlayComponent {
    public menuOpen = false;
    @Input() clickText;
    @Input() actionText: string[];
    @Output() actionClicked = new EventEmitter<string>();
    @Input() navTo;

    constructor(
        private store: Store<State>,
    ) {
    }


    openMenu(state: boolean) {
        this.menuOpen = state;
    }

    reset() {
        this.store.dispatch(new ResetGameMessageEditAction());

    }

    // test() {
    //     console.log("button clicked!");
    //     this.actionClicked.emit();
    // }


}
