import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Game} from "../../../../game-management/store/current-game.state";
import {getGame, iAmOwner} from "../../../../game-management/store/current-game.selector";
import {select, Store} from "@ngrx/store";
import {State} from "../../../../core/reducers";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {GameMessageUpdateAction, RemoveLocationAction} from "../../../../game-message/store/game-message.actions";
import {environment} from "../../../../../environments/environment";
import {GameConfigUpdateAction, GameUpdateAction} from "../../../../game-management/store/current-game.actions";
import {GpsPosition} from "../../../../game-message/component/screen-editor-type-select/component/pick-location-on-map/pick-location-on-map.component";
import "rxjs-compat/add/operator/first";
import {filter} from "rxjs/operators";

@Component({
    selector: 'app-game-detail-location',
    template: `
        <div>
            <div class="location-based">{{'GAME.LOCATION_BASED'}}</div>
            <mat-slide-toggle
                    [disabled]="!(iAmOwner|async)"
                    [(ngModel)]="locationBased"
                    (change)="slideChange($event)">{{'COMMON.ACTIVE' |translate}}
            </mat-slide-toggle>
            <div *ngIf="locationBased" class="map-area">

                <agm-map class="map"
                         [latitude]="lat"
                         [longitude]="lng">
                    <agm-marker
                            [markerDraggable]="iAmOwner|async"
                            [markerClickable]="false"
                            [latitude]="lat"
                            [longitude]="lng"
                            (dragEnd)="newLocation($event)"
                    >

                    </agm-marker>
                </agm-map>
            </div>
        </div>

    `,
    styles: [`
        .location-based {
            margin-top: 17px;
            margin-bottom: 15px;
            text-align: left;
            font: 100 12px/16px Roboto;
            letter-spacing: 0;
            color: #0000008A;
            opacity: 1;
        }

        .map-area {
            margin-top: 26px;
            width: 100%;
            height: 297px;
            background: transparent 0% 0% no-repeat padding-box;
            border: 4px solid #FFFFFF;
            opacity: 1;
        }

        .map {
            width: 100%;
            height: 100%;
            position: relative;
        }

    `]
})
export class GameDetailLocationComponent implements OnInit {

    @Input() locationBased = false;
    public iAmOwner: Observable<boolean> = this.store.pipe(select(iAmOwner));

    public game$: Observable<Game> = this.store.select(getGame).pipe(filter(g => g != null));

    lat = environment.homeLocation.latitude;
    lng = environment.homeLocation.longitude;

    constructor(public store: Store<State>) {
    }

    ngOnInit() {
        if (!this.lat) {
            this.lat = environment.homeLocation.latitude;
        }
        if (!this.lng) {
            this.lng = environment.homeLocation.longitude;
        }
        this.game$.first().toPromise().then((g) => {
            // console.log("game is", g);
            if (g.config.mapAvailable && g.lat && g.lng) {
                this.lat = g.lat;
                this.lng = g.lng;
            }
            this.locationBased = g.config.mapAvailable;

        });
    }

    slideChange(changeEvent: MatSlideToggleChange) {
        this.store.dispatch(new GameConfigUpdateAction({
            "mapAvailable": changeEvent.checked
        }));
        // if (!changeEvent.checked) {
        //     // this.store.dispatch(new RemoveLocationAction())
        // } else {
        //     this.ngOnInit();
        //
        //     // this.store.dispatch(new GameMessageUpdateAction({lat: this.lat, lng: this.lng}));
        // }
    }

    newLocation($event: GpsPosition) {
        console.log("location is", $event);
        this.store.dispatch(new GameUpdateAction({
            "lat": $event.coords.lat,
            "lng": $event.coords.lng,
        }));
        // this.onLocationChange.emit($event);


    }
}
