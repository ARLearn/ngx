import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Store} from "@ngrx/store";
import { State } from "../../core/reducers";
import { Subject } from "rxjs";
import { AngularFireStorage } from "angularfire2/storage";
import { GameTheme } from "../store/game-theme.state";
import {getGame} from "../../game-message/store/game-message.selector";
import {getMessagesSelector, getCurrentGameMessages} from "../../game-messages/store/game-messages.selector";
import {GameMessageEditCompletedAction, ResetGameMessageEditAction} from "../../game-message/store/game-message.actions";

@Component({
  selector: 'app-theme-settings',
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
      <div class="theme-panel">
        <div class="form">
          <div class="theme-icon">
            <div>
              <label>{{'COMMON.ICON_IMAGE'|translate}}</label>
            </div>
            <div class="theme-icon__img">
              <img [src]="selectedTheme.iconPath | async" alt="" />

              <span class="theme-icon__label" *ngIf="icon">{{ icon }}</span>
            </div>
          </div>

          <div class="icon-input">
            <mat-form-field class="example-full-width">
              <mat-label>{{'COMMON.INPUT_ICON_LABEL'|translate}}</mat-label>
              <input matInput #postalCode maxlength="2" [(ngModel)]="icon">
              <mat-hint align="end">{{postalCode.value.length}} / 2</mat-hint>
            </mat-form-field>
          </div>

          <div class="primary-color">
            <app-color-input
                [label]="'COMMON.PRIMARY_COLOR'|translate"
                [color]="selectedTheme.primaryColor"
                [canEdit]="false"
            ></app-color-input>
          </div>
        </div>

        <div>
          <img class="theme-background" [src]="selectedTheme.backgroundPath | async" alt="" />
        </div>

        <div class="theme-preview">
          <app-preview-pane-mobile-view></app-preview-pane-mobile-view>
        </div>
      </div>
    </div>
      
      <mat-toolbar *ngIf="selectedTheme" class="theme-toolbar">
        <div class="maxwidth theme-toolbar-wrapper">
          <div class="theme-info">
            <h4>{{ selectedTheme.name }}</h4>
          </div>
          <div>
            <button mat-button color="primary" (click)="selectedTheme = null">Deselecteren</button>
            <button mat-flat-button color="primary" (click)="onSubmit()">Ga verder</button>
          </div>
        </div>
      </mat-toolbar>
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
    
    .theme-background {
      display: block;
      margin-right: 2rem;
      width: 290px;
    }

    .theme-icon {
      position: relative;
    }
    
    .theme-icon label {
      color: rgba(0, 0, 0, 0.4);
    }
    
    .theme-icon__img img {
      width: 68px;
      height: 68px;
      border-radius: 16px;
    }
    
    .theme-icon__label {
      position: absolute;
      bottom: 4px;
      left: 10px;
      font-size: 32px;
      font-weight: 700;
      color: #fff;
    }
    .icon-input, .primary-color {
      margin-top: 3rem;
    }
    ::ng-deep .theme-panel .theme-preview .preview-outer-pane {
      top: 0;
    }
  `]
})
export class ThemeSettingsComponent implements OnInit, OnDestroy {

  public selectedTheme: any;
  public icon: string;

  public game$ = this.store.select(getGame);
  public messages$ = this.store.select(getCurrentGameMessages);

  private submit$: Subject<{ theme: GameTheme, iconAbbreviation: string }> = new Subject<{ theme: GameTheme, iconAbbreviation: string }>();

  get submit() {
    return this.submit$.asObservable();
  }

  constructor(public dialogRef: MatDialogRef<ThemeSettingsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public store: Store<State>,
              private afStorage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.game$.subscribe(game => {
      game.iconAbbreviation = 'Ef';

      this.icon = game.iconAbbreviation;
    });

    this.messages$.subscribe((messages) => {
      this.store.dispatch(new GameMessageEditCompletedAction(
          messages.find(m => m.type.includes('Multi')) || messages[0]
      ));
    });
  }

  ngOnDestroy() {
    this.store.dispatch(new ResetGameMessageEditAction());
  }

  onNoClick() {
    this.dialogRef.close();
  }

  select(theme) {
    this.selectedTheme = theme;
  }

  onSubmit() {
    this.submit$.next({ theme: this.selectedTheme, iconAbbreviation: this.icon });
  }

  getDownloadUrl(path: string) {
    if (typeof path !== 'string') {
      return path;
    }
    return this.afStorage.ref(path).getDownloadURL().toPromise();
  }
}
