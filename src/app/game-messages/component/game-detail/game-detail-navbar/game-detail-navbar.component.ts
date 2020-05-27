import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Game} from '../../../../game-management/store/current-game.state';
import {Store} from "@ngrx/store";
import {State} from "../../../../core/reducers";
import {Location} from "@angular/common";
import {Observable} from "rxjs";
import {getGame, getLoading} from "../../../../game-management/store/current-game.selector";
import {ANIMATION_MODULE_TYPE} from "@angular/platform-browser/animations";
import {environment} from "../../../../../environments/environment";


@Component({
  selector: 'app-game-detail-navbar',
  templateUrl: './game-detail-navbar.component.html',
  styleUrls: ['./game-detail-navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: ANIMATION_MODULE_TYPE, useValue: 'BrowserAnimations' },
  ],
})
export class GameDetailNavbarComponent implements OnInit {
  showLanguage: boolean = environment.showTranslate;

  public game$: Observable<Game> = this.store.select(getGame);
  public isLoading$: Observable<boolean> = this.store.select(getLoading);

  @Input() game;

  constructor(
      private location: Location,
      public store: Store<State>
  ) { }

  ngOnInit() {
  }
  back() {
    this.location.back();
  }
}
