import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {GameMessage} from "../../../game-messages/store/game-messages.state";
import {environment} from "../../../../environments/environment";
import {selectEntities} from "../../../game-themes/store/game-theme.selectors";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {State} from "../../../core/reducers";
import {Dictionary} from "@ngrx/entity";
import {GameTheme} from "../../../game-themes/store/game-theme.state";
import {QueryOne} from "../../../game-themes/store/game-theme.actions";

@Component({
    selector: 'app-screen-tile',
    template: `
        <div class="pos-tile style-tile">
            <app-hover-overlay
                    [clickText]="clickText"
                    [actionText]="actionText"
                    (actionClicked)="actionClickedMethod($event)"
                    [navTo]="navTo"
            >
                <app-filestore-background-image *ngIf="(imagePath || themeId) && !isVideo && (displayAsset ==='')"
                                                
                                                [paths]="[imagePath || ((themes |async)[themeId]?.backgroundPath)]"
                                                (isVideo)="$event?isVideo=true:isVideo=false"
                >
                </app-filestore-background-image>
                <app-filestore-background-video
                        *ngIf="videoPath &&isVideo"
                        [showControls]="false"
                        [paths]="[videoPath]"
                >
                </app-filestore-background-video>
                <div [ngStyle]="{'background':'transparent url('+displayAsset+')','height': '100%', 'background-size': 'cover'}"
                     *ngIf="(displayAsset !=='')"></div>
            </app-hover-overlay>
            <div class="pos-icon-type" *ngIf="icon">
                <i [ngClass]="icon"></i>
            </div>
            <div class="pos-details">

                <div class="pos-title font-regular-16-20-roboto">{{title}}</div>
                <div class="pos-date font-regular-12-20-roboto">{{subtitle}}</div>
            </div>
        </div>
    `,
    styles: [`
        .pos-icon-type {
            position: absolute;
            top: 16px;
            left: 14px;
            color: #ffffff;
            font-size: 22px;
        }

        .pos-tile {
            width: 236px;
            height: 388px;
            position: relative;
        }

        .style-tile {
            background: #E4E9EB 0% 0% no-repeat padding-box;
            box-shadow: 0px 1px 3px #00000029;
            border-radius: 2px;
        }

        .style-tile:hover {
            transform: translateY(-4px);
            box-shadow: 0px 6px 25px #00000029;
        }

        /*.pos-overlay {*/
        /*    position: absolute;*/
        /*    width: 100%;*/
        /*    height: 307px;*/
        /*}*/
        .pos-details {
            position: absolute;
            height: 81px;
            width: 100%;
            background: #FFFFFF 0% 0% no-repeat padding-box;
            bottom: 0px;
            border-radius: 0px 0px 2px 2px;

        }

        .pos-title {
            position: absolute;
            top: 19px;
            height: 18px;
            width: 100%;
            text-align: center;
            color: #000000DE;
            opacity: 1;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            padding-left: 5px;
            padding-right: 5px;
        }

        .pos-date {
            position: absolute;
            top: 42px;
            width: 100%;
            text-align: center;
            color: #000000DE;
            opacity: 0.54;
        }
    `]
})
export class ScreenTileComponent implements OnInit {

    @Input() title: string;
    @Input() subtitle;
    @Input() imagePath: string;
    @Input() themeId: number;
    // @Input() themePath = null;
    @Input() videoPath;
    @Input() clickText;
    @Input() navTo;
    @Input() icon;
    @Input() actionText: string[];
    @Input() displayAsset = "";
    @Output() actionClicked = new EventEmitter();
    @Input() isVideo = false;

    themes: Observable<Dictionary<GameTheme>> = this.store.select(selectEntities);

    constructor(private store: Store<State>) {
    }

    actionClickedMethod(event) {
        this.actionClicked.emit(event);
    }

    ngOnInit() {
        if (this.themeId) {
            this.store.dispatch(new QueryOne(this.themeId));
        }

    }

}
