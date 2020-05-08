import { Component, OnInit } from '@angular/core';
import {trigger, animate, state, style, transition} from '@angular/animations';
import {select, Store} from '@ngrx/store';
import {State} from '../../../core/reducers';
import {Observable} from 'rxjs';
import {getGame} from '../../store/current-game.selector';
import {Game} from '../../store/current-game.state';

@Component({
  selector: 'app-game-sidenav',
  templateUrl: './game-sidenav.component.html',
  styleUrls: ['./game-sidenav.component.css'],
    animations: [
        trigger('bodyExpansion', [
            state('collapsed', style({height: '0px', display: 'none'})),
            state('expanded', style({height: '*', display: 'block'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
        ]),
    ],
})
export class GameSidenavComponent implements OnInit {

  game$: Observable<Game> = this.store.pipe(select(getGame));

  constructor(
    private store: Store<State>
  ) {
  }

  ngOnInit() {
  }

}
