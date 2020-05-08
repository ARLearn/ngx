import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Observable, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {State} from '../../../core/reducers';
import {getAllPlayers} from '../../store/player.selector';
import {RemoveFriendRequestAction} from '../../store/player.actions';


@Component({
  selector: 'app-friends-table',
  templateUrl: './friends-table.component.html',
  styleUrls: ['./friends-table.component.css']
})
export class FriendsTableComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['picture', 'name', 'email', 'controls'];
  public players: Observable<any> = this.store.pipe(select(getAllPlayers));
  dataSource: MatTableDataSource<any>;
  subscription: Subscription;


  constructor(
    private store: Store<State>
  ) {
  }


  ngOnInit() {
    this.subscription = this.players.subscribe((friends) => {
      console.log('friends', friends);
      this.dataSource = new MatTableDataSource(friends);
      const sortState: Sort = {active: 'name', direction: 'desc'};
      if (this.sort) {
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);
      }
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  click(player: any) {
    // this.store.dispatch(new SelectRunAction(gameRun));
  }

  deleteFriend(player: any) {
    this.store.dispatch(new RemoveFriendRequestAction(player));
  }

}
