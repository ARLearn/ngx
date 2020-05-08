import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {select, Store} from '@ngrx/store';
import {State} from '../../../core/reducers';
import {PlayerLoadRequestAction} from '../../../player-management/store/player.actions';
import {Observable} from 'rxjs';
import {getAllPlayers} from '../../../player-management/store/player.selector';

@Component({
  selector: 'app-add-author-dialog',
  templateUrl: './add-author-dialog.component.html',
  styleUrls: ['./add-author-dialog.component.css']
})
export class AddAuthorDialogComponent {

  public players$: Observable<any> = this.store.pipe(select(getAllPlayers));

  constructor(
    public dialogRef: MatDialogRef<AddAuthorDialogComponent>,
    private store: Store<State>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.store.dispatch(new PlayerLoadRequestAction());
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
