import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {

  screen = 3;
  constructor( public dialogRef: MatDialogRef<NewGameComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.dialogRef.addPanelClass("modal-panel");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  selectTemplate() {
    this.screen = 2;
  }
  mainMenu(){
    this.screen = 1;
  }

  onButtonClick() {
    this.screen = 3;
  }
}
