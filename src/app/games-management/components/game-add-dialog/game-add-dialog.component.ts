import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-game-add-dialog',
  templateUrl: './game-add-dialog.component.html',
  styleUrls: ['./game-add-dialog.component.css']
})
export class GameAddDialogComponent {



  constructor(
    public dialogRef: MatDialogRef<GameAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
