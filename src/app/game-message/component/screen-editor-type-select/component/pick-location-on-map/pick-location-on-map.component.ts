import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {environment} from "../../../../../../environments/environment";
import {GameMessageUpdateAction, RemoveLocationAction} from "../../../../store/game-message.actions";
import {select, Store} from "@ngrx/store";
import {State} from "../../../../../core/reducers";
import {Observable} from "rxjs";
import { iCanWrite } from 'src/app/game-management/store/current-game.selector';

export interface GpsPosition {
    coords: { lat: number, lng: number }
}
@Component({
    selector: 'app-pick-location-on-map',
    template: `
        <div>
            <div class="location-based">{{'GAME.LOCATION_BASED' | translate}}</div>
            <mat-slide-toggle
                    [disabled]="!(iCanWrite|async)"
                    [(ngModel)]="locationBased"
                    (change)="slideChange($event)">{{'COMMON.ACTIVE' |translate}}</mat-slide-toggle>
            <div *ngIf="locationBased" class="location-based">{{'MESSAGE.SHOW_IN_LIST' | translate}}</div>
            <mat-slide-toggle
                    [disabled]="!(iCanWrite|async)"
                    [(ngModel)]="showInList"
                    (change)="listSlideChange($event)">{{'COMMON.ACTIVE' |translate}}</mat-slide-toggle>
            
            <div *ngIf="locationBased" class="map-area">

                <agm-map class = "map"
                         [latitude]="lat"
                         [longitude]="lng">
                    <agm-marker
                            [markerDraggable] = "iCanWrite|async"
                            [markerClickable] = "false"
                            [latitude]="lat"
                            [longitude]="lng"
                            (dragEnd)="newLocation($event)"
                    >

                    </agm-marker>
                </agm-map>
            </div>
        </div>

    `,
    styleUrls: ['./pick-location-on-map.component.css']
})
export class PickLocationOnMapComponent implements OnInit {
    public iCanWrite: Observable<boolean> = this.store.pipe(select(iCanWrite));

    @Input() locationBased = false;
    @Input() showInList = false;
    @Input() lat = environment.homeLocation.latitude;
    @Input() lng = environment.homeLocation.longitude;
    @Output() onLocationChange = new EventEmitter<GpsPosition>();
    @Output() disableLocation = new EventEmitter<boolean>();

    constructor(public store: Store<State>) {
    }

    ngOnInit() {
        if (!this.lat) this.lat = environment.homeLocation.latitude;
        if (!this.lng) this.lng = environment.homeLocation.longitude;
    }

    slideChange(changeEvent: MatSlideToggleChange) {
        if (!changeEvent.checked) {
            this.store.dispatch(new RemoveLocationAction());
        } else {
            this.ngOnInit();
            // this.onLocationChange.emit({coords:{lat:this.lat, lng:this.lng}});
            this.store.dispatch(new GameMessageUpdateAction({lat: this.lat, lng: this.lng}));
        }
    }

    listSlideChange(changeEvent: MatSlideToggleChange) {
        this.store.dispatch(new GameMessageUpdateAction({showInList: changeEvent.checked}));
    }

    newLocation($event: GpsPosition) {
        console.log("location is", $event);
        // this.onLocationChange.emit($event);
        this.store.dispatch(new GameMessageUpdateAction({lat: $event.coords.lat, lng: $event.coords.lng}));

    }
}
