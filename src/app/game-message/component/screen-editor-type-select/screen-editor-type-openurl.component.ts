import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {getEditMessageSelector, selectedColor} from "../../store/game-message.selector";
import {GameMessage} from "../../../game-messages/store/game-messages.state";
import {Game} from "../../../game-management/store/current-game.state";
import {getGame, iCanWrite} from "../../../game-management/store/current-game.selector";
import {select, Store} from "@ngrx/store";
import {State} from "../../../core/reducers";
import {GameMessageUpdateAction, RemoveColorAction} from "../../store/game-message.actions";

@Component({
  selector: 'app-screen-editor-type-openurl',
  template: `
    <mat-form-field
        class="gl-pos-field-full-width gl-pos-between-fields">
      <input matInput [placeholder]="'GAME.TITLE'|translate"
             [disabled]="!(iCanWrite|async)"
             [ngModel]="(message$|async)?.name"
             (ngModelChange)="titleChange($event)">
    </mat-form-field>

      <mat-form-field
        class="gl-pos-field-full-width gl-pos-between-fields">
      <input matInput [placeholder]="'GAME.URL'|translate"
             [disabled]="!(iCanWrite|async)"
             [ngModel]="(message$|async)?.url"
             (ngModelChange)="urlChange($event)">
    </mat-form-field>

    <mat-form-field class="gl-pos-field-full-width gl-pos-between-fields">

      <input matInput [placeholder]="'MESSAGE.BUTTON_TEXT'|translate"
             [disabled]="!(iCanWrite|async)"
             [ngModel]="(message$|async)?.description"
             (ngModelChange)="descriptionChange($event)">
    </mat-form-field>
    <div class="color-picker-class gl-pos-between-fields">
      <app-color-input
          [canEdit]="(iCanWrite|async)"
          [label]="'COMMON.PRIMARY_COLOR' |translate"
          [color]="primColor$ | async"
          [unselect]="true"
          (onChange)="primColorChange($event)"
      ></app-color-input>
    </div>
  `,
  styles: [`
    .color-picker-class {
      height: 35px;
      top: 10px
    }
  `]
})
export class ScreenEditorTypeOpenurlComponent {

  primColor$: Observable<string> = this.store.select(selectedColor);
  message$: Observable<GameMessage> = this.store.select(getEditMessageSelector);
  game$: Observable<Game> = this.store.select(getGame);
  iCanWrite: Observable<boolean> = this.store.pipe(select(iCanWrite));

  constructor(private store: Store<State>) {}

  titleChange(event: any) {
    this.store.dispatch(new GameMessageUpdateAction({ name: event }));
  }

  descriptionChange(event: any) {
    this.store.dispatch(new GameMessageUpdateAction({ description: event }));
  }

  urlChange(event: any) {
    this.store.dispatch(new GameMessageUpdateAction({ url: event }));
  }

  primColorChange(color: string) {
    if (color === "default") {
      this.store.dispatch(new RemoveColorAction());
    } else {
      this.store.dispatch(new GameMessageUpdateAction({ primaryColor: color }));
    }
  }
}
