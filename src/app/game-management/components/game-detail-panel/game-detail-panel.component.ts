import {Component, Input, OnInit} from '@angular/core';
import {State} from '../../../core/reducers';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {getGame} from '../../store/current-game.selector';
import {Game} from '../../store/current-game.state';


@Component({
  selector: 'app-game-detail-panel',
  templateUrl: './game-detail-panel.component.html',
  styleUrls: ['./game-detail-panel.component.css']
})
export class GameDetailPanelComponent implements OnInit {


  @Input() game: Game;

  step = 0;

  setStep(index: number) {
    this.step = index;
  }
  // public game$: Observable<Game>; // = this.store.select(getGame );

  constructor(
    private store: Store<State>
  ) {

  }

  ngOnInit() {
    // this.game$ = this.store.select(getGame);
    // this.game$.subscribe(game => {
    //   console.log('game is now2 ', game);
    // });
  }

}
