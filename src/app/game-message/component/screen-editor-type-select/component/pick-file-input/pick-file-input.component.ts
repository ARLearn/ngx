import {Component, Input, OnInit} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from "angularfire2/storage";
import {Observable} from "rxjs";
import {GameMessage} from "../../../../../game-messages/store/game-messages.state";
import {getEditMessageSelector} from "../../../../store/game-message.selector";
import {Store} from "@ngrx/store";
import {State} from "../../../../../core/reducers";

@Component({
  selector: 'app-pick-file-input',
  templateUrl: './pick-file-input.component.html',
  styleUrls: ['./pick-file-input.component.css']
})
export class PickFileInputComponent implements OnInit {

  @Input() backgroundPath;
  @Input() mimetype = "image/jpeg";

  task: AngularFireUploadTask;

  files: any = [];
  percentage: Observable<number>;

  constructor(
      private store: Store<State>,
      public afStorage: AngularFireStorage
  ) {
  }

  ngOnInit() {
  }


  // backgroundPath = '/game/5641497726681088/generalItems/5634263223369728/background.jpg';
  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element.name);

      const customMetadata = { contentType: element.type };
      if (!customMetadata.contentType) {
        customMetadata.contentType = this.mimetype;
      }

      // console.log("uploading to ", this.backgroundPath);
      this.task = this.afStorage.upload(this.backgroundPath, element,  customMetadata );

      this.percentage = this.task.percentageChanges();
      this.percentage.subscribe((value: number) => {


        if (value >= 100) {
          setTimeout(() => {
            // this.reload();
            this.percentage = null;
          }, 1000);
        }
      });
    }
  }
}
