import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {State} from '../../../../core/reducers';
import {getFeaturedGameList} from '../../store/featured-games.selector';
import {FeaturedGame} from '../../store/featured-games.state';
import {GetFeaturedGameListRequestAction} from '../../store/featured-games.actions';

@Component({
  selector: 'app-featured-games-table',
  templateUrl: './featured-games-table.component.html',
  styleUrls: ['./featured-games-table.component.css']
})
export class FeaturedGamesTableComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = [ 'title'];
  private games$: Observable<FeaturedGame[]> = this.store.select(getFeaturedGameList);

  dataSource: MatTableDataSource<any>;

  gameId: number = null;
  public subscription: Subscription;

  constructor(
    private store: Store<State>
  ) {
    // this.store.dispatch(new GetGameListRequestAction());

  }

  ngOnInit() {
    this.store.dispatch(new GetFeaturedGameListRequestAction({}));
    this.subscription = this.games$.subscribe((gameWithState) => {
      this.dataSource = new MatTableDataSource(gameWithState);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

  }

  clickGame(gameId: number) {

    // if (this.gameId === gameId) {
    //   this.gameId = null;
    //   this.store.dispatch(new ResetCurrentGameRequestAction({gameId: gameId}));
    // } else {
    //   this.gameId = gameId;
    //   this.store.dispatch(new SetCurrentGameRequestAction({gameId: gameId}));
    // }

    // this.game.emit(gameId);
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
