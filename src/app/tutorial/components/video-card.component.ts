import {Component, Input, OnInit} from '@angular/core';

import {AngularFireStorage} from "angularfire2/storage";
import {GameMessage} from "../../game-messages/store/game-messages.state";
import {Observable} from "rxjs";
import {take} from "rxjs/operators";

@Component({
    selector: 'app-video-card',
    template: `
        <mat-card [routerLink]="'/portal/tutorial/video/'+video.gameId+'/'+video.id">
            <img class="question-card-image" mat-card-image [src]="url |async"
                 alt="Photo of a Shiba Inu">
            <mat-card-content>
                <h4 class="question-card-title">
                    {{video.name}}
                </h4>
                <p class="question-card-meta">
                    Watch, 7 min.
                </p>
            </mat-card-content>
        </mat-card>
    `,
    styles: [`


        .question-card-image {
            height: 180px;
            object-fit: cover;
        }

        .question-card-title {
            padding-top: 10px;
            font-size: 14px;
        }

        .question-card-meta {
            padding: 10px 0 5px;
        }
    `]
})
export class VideoCardComponent implements OnInit {

    @Input() video: GameMessage;
    url: Observable<string>;

    // metadata: Observable<any>;

    constructor(public afStorage: AngularFireStorage) {
    }

    ngOnInit(): void {
        console.log(this.video.fileReferences['background']);
        this.url = this.afStorage.ref(this.video.fileReferences['background']).getDownloadURL();
        // this.metadata =  this.afStorage.ref(this.video.fileReferences['video']).getMetadata();

    }

}
