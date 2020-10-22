import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Player} from "../../../player-management/store/player.state";

@Component({
    selector: 'app-connection-tile',
    template: `
        <mat-icon *ngIf="pending"
                  class="style-icon"
                  (click)="removeInvitation.emit()"
                  [svgIcon]="'close'"></mat-icon>
        <mat-icon *ngIf="hasAction"
                  class="style-icon"
                  [matMenuTriggerFor]="menu"
                  >more_vert</mat-icon>
        <mat-menu #menu="matMenu">
            <button 
                    *ngFor="let action of actions"
                    mat-menu-item (click)="actionsClick.emit(action)" >
                <mat-icon>delete_forever</mat-icon>
                <span>{{ 'ACTIONS.'+action | translate }}</span>
            </button>

        </mat-menu>
        <div *ngIf="!player.picture"
             class="avatar-circle"></div>
        <div *ngIf="player.picture"
             [ngStyle]="{'background': 'transparent url('+picture+') 0% 0% no-repeat padding-box'}"
             class="avatar-circle">

        </div>
        <div [ngStyle]="{'opacity': pending?'0.54':1}">
            <div *ngIf="!player.picture"
                 [ngStyle]="{'background': 'transparent url('+picture+') 0% 0% no-repeat padding-box' }"
                 class="avatar-text font-medium-24-32-roboto"
            >
                {{initial}}
            </div>
        </div>

        <div class="name-section font-regular-11-15-roboto">
            {{pending ? player.email : player.name}}
        </div>

        <div class="remove-button "
        *ngIf="canRemove"
        >
            <button mat-button color="primary"
                    class="mat-small"
                    (click)="buttonclick()"
            >
                <div
                        *ngIf="!pending"
                        class="font-medium-10-13-roboto button-text">{{'ACTIONS.DELETE_PLAYER' | translate}}</div>
                <div
                        *ngIf="pending"
                        class="font-medium-10-13-roboto button-text">{{'ACTIONS.RE_INVITE' | translate}}</div>

            </button>
        </div>

    `,
    styles: [`
        .style-icon {
            position: absolute;
            top: 7px;
            right: 7px;
            transform: scale(0.83);
            cursor: pointer;
        }

        .avatar-circle {
            position: absolute;
            border-radius: 50%;
            top: 24px;
            left: 37px;
            right: 37px;
            width: 78px;
            height: 78px;
            background: #E4E9EB 0% 0% no-repeat padding-box;
            opacity: 1;
        }

        .avatar-text {
            position: absolute;
            border-radius: 50%;
            top: 49px;
            left: 37px;

            width: 78px;
            height: 28px;

            /*background: #E4E9EB 0% 0% no-repeat padding-box;*/
            opacity: 1;
            text-align: center;
            color: #000000;
            opacity: 0.3;
            text-transform: uppercase;
        }

        .name-section {
            position: absolute;
            top: 114px;
            padding-left: 5px;
            padding-right: 5px;
            width: 100%;
            text-align: center;
            letter-spacing: 0;
            color: #000000;
            opacity: 0.54;

            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .remove-button {
            position: absolute;
            top: 133px;
            width: 100%;
            text-align: center;

        }

        .button-text {
            text-transform: uppercase;
        }

    `]
})
export class ConnectionTileComponent implements OnInit, OnChanges {

    @Input() player: Player;
    @Input() pending = false;
    @Input() hasAction = false;
    @Input() canRemove = true;
    @Input() actions = [];
    @Output() remove = new EventEmitter();
    @Output() removeInvitation = new EventEmitter();
    @Output() reinvite = new EventEmitter();
    @Output() actionsClick = new EventEmitter();

    picture: string;
    initial: string;

    constructor() {
    }

    ngOnInit() {
    }

    buttonclick() {
        if (this.pending) {
            console.log("reinvite")
            this.reinvite.emit();
        } else {
            this.remove.emit();
        }

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.player.picture != null) {
            this.picture = this.player.picture + "=w78";
            if (this.player.picture.indexOf('=') !== -1) {
                this.picture = this.player.picture.substr(0, this.player.picture.indexOf('=')) + "=w78";
            }
        }
        if (this.player.name) {
            this.initial = this.player.name.split(" ").map(name => name.substr(0, 1)).join('').substr(0, 2);
        } else {
            this.initial = "??";
        }
        if (this.pending) {
            let index = this.player.email.indexOf('@');
            let name = this.player.email;
            if (index !== -1) {
                name = this.player.email.substr(0, index);
                console.log("name is", name);
            }
            this.initial = name.split(".").map(name => name.substr(0, 1)).join('').substr(0, 2);
        }
    }

}
