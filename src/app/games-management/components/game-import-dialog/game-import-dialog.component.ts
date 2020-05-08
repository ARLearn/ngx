import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import {FileSystemFileEntry, UploadEvent, UploadFile} from 'ngx-file-drop';

@Component({
  selector: 'app-game-import-dialog',
  templateUrl: './game-import-dialog.component.html',
  styleUrls: ['./game-import-dialog.component.css']
})
export class GameImportDialogComponent  {
  // public files: UploadFile[] = [];

  // uploadedGame: any;
  public dropped(event: any) {}
  // public dropped(event: UploadEvent) {
  //   this.files = event.files;
  //   // console.log(this.files);
  //   const dropFile = this.files[0];
  //   const fileEntry = dropFile.fileEntry as FileSystemFileEntry;
  //   const reader = new FileReader();
  //   fileEntry.file((file: File) => {
  //     reader.readAsText(file);
  //     reader.onload = () => {
  //       console.log(reader.result);
  //       this.data = JSON.parse("" + reader.result);
  //       // const result = this.csvToArray(reader.result);
  //       // // console.log('split', result);
  //       // this.store.dispatch(new UploadCSVAction({csv: result}));
  //
  //     };
  //   });
  //
  // }

  public fileOver(event) {
    // console.log(event);
  }

  public fileLeave(event) {
    // console.log(event);
  }

  constructor(
    public dialogRef: MatDialogRef<GameImportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
