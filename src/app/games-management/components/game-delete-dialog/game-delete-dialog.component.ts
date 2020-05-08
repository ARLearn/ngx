import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-game-delete-dialog',
  templateUrl: './game-delete-dialog.component.html',
  styleUrls: ['./game-delete-dialog.component.css']
})
export class GameDeleteDialogComponent {


  constructor(
    public dialogRef: MatDialogRef<GameDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
