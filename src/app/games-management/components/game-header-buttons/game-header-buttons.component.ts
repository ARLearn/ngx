import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from 'src/app/core/reducers';
import { MatDialog } from '@angular/material/dialog';
import {GameAddDialogComponent} from '../game-add-dialog/game-add-dialog.component';
import {CreateGameRequestAction, DeleteGameRequestAction, ImportGameRequestAction} from '../../store/game.actions';
import {GameDeleteDialogComponent} from '../game-delete-dialog/game-delete-dialog.component';
import {GameImportDialogComponent} from '../game-import-dialog/game-import-dialog.component';

@Component({
  selector: 'app-game-header-buttons',
  templateUrl: './game-header-buttons.component.html',
  styleUrls: ['./game-header-buttons.component.css']
})
export class GameHeaderButtonsComponent implements OnInit {

  @Input('gameSelected') gameSelected: boolean;

  constructor(public dialog: MatDialog, private store: Store<State>) {
  }

  ngOnInit() {
  }

  deleteGame() {
    const dialogRef = this.dialog.open(GameDeleteDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new DeleteGameRequestAction(result));
      }
    });

  }

  openCreateGame() {
    const dialogRef = this.dialog.open(GameAddDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new CreateGameRequestAction(result));
      }
    });
  }

  openImportGame() {


    // this.store.dispatch(new ImportGameRequestAction({
    //     game: {
    //       type: 'org.celstec.arlearn2.beans.game.Game',
    //       gameId: '6131899618557952',
    //       deleted: false,
    //       lastModificationDate: '1554498427258',
    //       title: 'Van Nelle',
    //       description: '',
    //       config: {
    //         type: 'org.celstec.arlearn2.beans.game.Config',
    //         mapAvailable: false,
    //         enableMyLocation: false,
    //         enableExchangeResponses: true,
    //         minZoomLevel: 1,
    //         maxZoomLevel: 20
    //       },
    //       sharing: 3,
    //       licenseCode: 'cc-by',
    //       language: 'en',
    //       theme: 1
    //     },
    //     messages: [
    //       {
    //         type: 'org.celstec.arlearn2.beans.generalItem.VideoObject',
    //         gameId: '6131899618557952',
    //         deleted: false,
    //         lastModificationDate: '1553873016833',
    //         id: '5507418487259136',
    //         scope: 'user',
    //         name: 'Tearoom',
    //         description: '',
    //         dependsOn: {
    //           type: 'org.celstec.arlearn2.beans.dependencies.ActionDependency',
    //           action: 'vijver',
    //           generalItemId: '6071289778274304',
    //           scope: 0
    //         },
    //         autoLaunch: false,
    //         richText: '',
    //         videoFeed: '',
    //         message: true
    //       }
    //     ]
    //   }
    //   )
    // );

    const dialogRef = this.dialog.open(GameImportDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('result ', result);
      if (result) {
        this.store.dispatch(new ImportGameRequestAction(result));
      }
    });
  }


}
