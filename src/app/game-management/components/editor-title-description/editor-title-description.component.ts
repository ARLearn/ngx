import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
// import {MatProgressButtonOptions} from 'mat-progress-buttons';
import {DownloadGameRequestAction, SaveGameRequestAction} from '../../store/current-game.actions';
import {select, Store} from '@ngrx/store';
import {State} from '../../../core/reducers';
import {combineLatest, Observable, of} from 'rxjs';
import {getButtonDisabled} from '../../store/current-game.selector';
import {map} from 'rxjs/operators';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import {environment} from '../../../../environments/environment';
import {Game} from '../../store/current-game.state';

interface Coordinates {
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-editor-title-description',
  templateUrl: './editor-title-description.component.html',
  styleUrls: ['./editor-title-description.component.css']
})
export class EditorTitleDescriptionComponent implements OnInit, OnChanges {

  @Input() game: Game;

  slide: boolean;

  // btnOpts: MatProgressButtonOptions = {
  //   active: false,
  //   text: 'Save',
  //   buttonColor: 'primary',
  //   barColor: 'accent',
  //   raised: true,
  //   stroked: false,
  //   flat: false,
  //   mode: 'indeterminate',
  //   value: 0,
  //   disabled: false
  // };

  constructor(
    private store: Store<State>
  ) {
  }

  coordinates: Coordinates = environment.homeLocation;

  buttonState$: Observable<any>;

  ngOnInit() {

    // this.importCoordinatesFromGame();
    // this.buttonState$ = combineLatest(
    //   of(this.btnOpts),
    //   this.store.pipe(select(getButtonDisabled))
    // ).pipe(map(x => Object.assign(x[0], x[1])));
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("on change", this.coordinates);
    this.slide = !!this.game.lat;
    if (this.slide) {
      // console.log("slide true");
      this.importCoordinatesFromGame();
    } else {
      // console.log("slide false");
      this.importCoordinatesFromNavigator();
    }
  }

  locationChanged(test: MatSlideToggleChange) {
    if (test.checked) {
      this.game.lat = this.coordinates.latitude;
      this.game.lng = this.coordinates.longitude;
      this.game.config.mapAvailable = true;
    } else {
      this.importCoordinatesFromGame();
      this.game.config.mapAvailable = false;
      this.game.lat = undefined;
      this.game.lng = undefined;
    }
  }

  importCoordinatesFromNavigator() {
    // console.log("calling navigator");
    navigator.geolocation.getCurrentPosition((pos: Position) => {
        this.coordinates = pos.coords;
        // console.log("retrieve from navigator", this.coordinates);
      }, () => {
        console.log('error retrieving location');
        this.coordinates = environment.homeLocation;
      }
    );
  }

  importCoordinatesFromGame() {
    if (!!this.game.lat) {
      this.coordinates = {
        latitude: this.game.lat,
        longitude: this.game.lng
      };
    } else {
      this.importCoordinatesFromNavigator();
    }

  }

  saveMethod() {
    // let config: UserConfig = {
    //   'notificationSetting': this.notificationsEnabled ? this.notificationType : 0,
    //   'binFullAlert': this.binFullAlert,
    //   'devicehasRebootedAlert': this.devicehasRebootedAlert,
    //   'noCommunicationAlert': this.noCommunicationAlert,
    //   'frontValveOpenAlert': this.frontValveOpenAlert,
    //   'serviceDoorOpenAlert': this.serviceDoorOpenAlert
    // };

    this.store.dispatch(new SaveGameRequestAction(this.game));

  }

  downloadMethod() {
    console.log('about to download');
    this.store.dispatch(new DownloadGameRequestAction(this.game));
  }


}
