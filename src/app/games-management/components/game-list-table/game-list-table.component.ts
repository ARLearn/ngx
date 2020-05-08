import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {State} from '../../../core/reducers';
import {GetGameListRequestAction} from '../../store/game.actions';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {getGameList} from '../../store/game.selector';
import {ResetCurrentGameRequestAction, SetCurrentGameRequestAction} from '../../../game-management/store/current-game.actions';
import {Game} from '../../../game-management/store/current-game.state';
import {Router} from '@angular/router';

@Component({
  selector: 'app-game-list-table',
  templateUrl: './game-list-table.component.html',
  styleUrls: ['./game-list-table.component.css']
})
export class GameListTableComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() selectedGame: Game;

  displayedColumns = ['title', 'lastModificationDate', 'controls'];
  private games$: Observable<any[]> = this.store.select(getGameList);

  dataSource: MatTableDataSource<any>;

  gameId: number = null;

  constructor(
    private store: Store<State>,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.games$.subscribe((gameWithState) => {
      this.dataSource = new MatTableDataSource(gameWithState);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    // this.store.dispatch(new GetGameListRequestAction());
  }

  clickGame(gameId: number) {
    if (this.gameId === gameId) {
      this.gameId = null;
      this.store.dispatch(new ResetCurrentGameRequestAction({gameId: gameId}));
    } else {
      this.gameId = gameId;
      this.store.dispatch(new SetCurrentGameRequestAction({gameId: gameId}));
    }

    // this.game.emit(gameId);
  }

  openGame(gameId: number) {
    console.log('about to open ', gameId);
    this.router.navigate(['/portal', gameId, 'messages', 'table']);
    //http://localhost:5200/#/portal/5682747733442560/messages/table

  }

  @Output('game') game: EventEmitter<number> = new EventEmitter<number>();
}
