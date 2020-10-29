import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Store} from "@ngrx/store";
import { State } from "../../../core/reducers";
import { Subject } from "rxjs";
import { AngularFireStorage } from "angularfire2/storage";
import { GameTheme } from "../../store/game-theme.state";
import {getGame} from "../../../game-message/store/game-message.selector";
import {getMessagesSelector, getCurrentGameMessages} from "../../../game-messages/store/game-messages.selector";
import {GameMessageEditCompletedAction, ResetGameMessageEditAction} from "../../../game-message/store/game-message.actions";
import {StartUploadAction} from "../../../media-library/store/media-lib.actions";

@Component({
  selector: 'app-create-theme-settings',
  template: `
    <div class="maxwidth pos-top">
      <app-modal-esc-button
          class="gl-pos-modal-esc-button"
          [type]="'esc'" (buttonClick)="onNoClick()"></app-modal-esc-button>
      <app-modal-esc-button
          class="gl-pos-modal-back-button"
          [type]="'back'" (buttonClick)="onNoClick()"></app-modal-esc-button>
    </div>
    <div class="maxwidth">
      <div class="pos-title primary-color font-medium-32-43-roboto">{{ 'THEME.MAKE_YOUR_THEME' | translate }}</div>
      <div class="theme-panel" *ngIf="theme.themeId">
        <div class="form">
          <div class="theme-icon">
            <div>
              <label>{{'COMMON.ICON_IMAGE'|translate}}</label>
            </div>
            <app-theme-file-picker 
                [path]="'/customthemes/' + theme.fullAccount + '/' + theme.themeId + '/icon.png'"
                [small]="true"
                (onUpload)="downloadedImages['icon'] = true"
                (onFailure)="downloadedImages['icon'] = false"
            ></app-theme-file-picker>
          </div>

          <div class="primary-color">
            <app-color-input
                [label]="'COMMON.PRIMARY_COLOR'|translate"
                [color]="theme.primaryColor"
                [canEdit]="true"
            ></app-color-input>
          </div>
        </div>

        <div class="uploader">
          <app-theme-file-picker 
              [path]="'/customthemes/' + theme.fullAccount + '/' + theme.themeId + '/background.png'"
              title="Kies achtergrond"
              (onUpload)="downloadedImages['background'] = true"
              (onFailure)="downloadedImages['background'] = false"
          ></app-theme-file-picker>
        </div>

        <div class="uploader">
          <app-theme-file-picker
              [path]="'/customthemes/' + theme.fullAccount + '/' + theme.themeId + '/correct.png'"
              title="Juist anwoord"
              (onUpload)="downloadedImages['correct'] = true"
              (onFailure)="downloadedImages['correct'] = false"
          ></app-theme-file-picker>
        </div>

        <div class="uploader">
          <app-theme-file-picker 
              [path]="'/customthemes/' + theme.fullAccount + '/' + theme.themeId + '/wrong.png'"
              title="Onjuist anwoord"
              (onUpload)="downloadedImages['wrong'] = true"
              (onFailure)="downloadedImages['wrong'] = false"
          ></app-theme-file-picker>
        </div>
      </div>


      <mat-toolbar class="theme-toolbar">
        <div class="maxwidth theme-toolbar-wrapper">
          <div class="theme-info">
            Upload jouw afbeeldingen
          </div>
          <div>
            <button mat-button color="primary" (click)="onNoClick()">Ga terug</button>
            <button mat-flat-button color="primary" (click)="onSubmit()" [disabled]="!isValid">Ga verder</button>
          </div>
        </div>
      </mat-toolbar>
      
    </div>
  `,
  styles: [`
    .pos-top {
      height: 1px;
    }
    .pos-title {
      position: relative;
      margin-top: 83px;
      height: 38px;
      text-align: center;
    }
    .theme-panel {
      display: flex;
      align-items: flex-start;
      margin-top: 3rem;
    }
    .theme-panel .form {
      margin-right: 4rem;
    }

    .uploader {
      margin: 0 10px;
      width: 263px;
      height: 418px;
    }

    .theme-icon {
      position: relative;
    }
    
    .theme-icon label {
      color: rgba(0, 0, 0, 0.4);
    }
    .icon-input, .primary-color {
      margin-top: 3rem;
    }
    ::ng-deep .theme-panel .theme-preview .preview-outer-pane {
      top: 0;
    }

    .theme-toolbar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #ffffff;
    }

    .theme-toolbar-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }

    .theme-toolbar .image {
      height: 100%;
      max-width: 40px;
      margin-right: 20px;
    }

    .theme-toolbar .theme-info {
      display: flex;
      align-items: center;
    }
  `]
})
export class CreateThemeSettingsComponent implements OnInit, OnDestroy {
  public theme: any = {
    iconPath: '',
    primaryColor: '#ffffff',
    fullAccount: '',
    themeId: ''
  };

  public game$ = this.store.select(getGame);
  public messages$ = this.store.select(getCurrentGameMessages);

  private submit$: Subject<GameTheme> = new Subject<GameTheme>();

  public downloadedImages = {
    icon: false,
    background: false,
    correct: false,
    wrong: false,
  }

  get isValid() {
    return Object.values(this.downloadedImages).every(x => !!x);
  }

  get submit() {
    return this.submit$.asObservable();
  }

  constructor(public dialogRef: MatDialogRef<CreateThemeSettingsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public store: Store<State>,
              private afStorage: AngularFireStorage) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.store.dispatch(new ResetGameMessageEditAction());
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onSubmit() {
    const iconPath = '/customthemes/' + this.theme.fullAccount + '/' + this.theme.themeId + '/icon.png';
    const backgroundPath = '/customthemes/' + this.theme.fullAccount + '/' + this.theme.themeId + '/background.png';
    const correctPath = '/customthemes/' + this.theme.fullAccount + '/' + this.theme.themeId + '/correct.png';
    const wrongPath = '/customthemes/' + this.theme.fullAccount + '/' + this.theme.themeId + '/wrong.png';

    this.submit$.next({ ...this.theme, iconPath, backgroundPath, correctPath, wrongPath });
  }

  handleUploadFile() {
    this.store.dispatch(new StartUploadAction());
  }

  getDownloadUrl(path: string) {
    if (typeof path !== 'string') {
      return path;
    }
    return this.afStorage.ref(path).getDownloadURL().toPromise();
  }
}
