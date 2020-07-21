import {Component, OnInit} from '@angular/core';
import {
  GetCurrentGameFromRouterRequestAction
} from "../store/current-game.actions";
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {Observable} from "rxjs";
import {Game} from "../store/current-game.state";
import {getGame} from "../store/current-game.selector";
import {GetGameMessagesRequestAction} from "../../game-messages/store/game-messages.actions";

@Component({
  selector: 'app-game-detail-settings',
  template: `
    <div class="box">
      <app-game-detail-navbar class="row mx-0 header" [game]="game$|async"></app-game-detail-navbar>
      <div class="content h-100">
        <div class="maxwidth h-100 settings-wrapper">
          <div class="parent">
            <app-game-settings-fields class="editor"></app-game-settings-fields>
            <app-game-settings-preview class="preview-pane"></app-game-settings-preview>
          </div>
        </div>
        <!--        <div style="background-color: yellow;width: 100px;height:1300px;"></div>-->
      </div>

      <!--    <div class="row footer">-->
      <!--        <p><b>footer</b> (fixed height)</p>-->
      <!--    </div>-->
    </div>
  `,
  styles: [`

        .parent {
            display: flex;
            height: 100%;
            min-width: 917px;
        }

        .editor {
            flex: 1;
            width: 937px;
        }

        .preview-pane {
            flex: 0 0 429px;
            background: #FAFAFA 0% 0% no-repeat padding-box;
            opacity: 1;

            position: absolute;
            right: 0;
            bottom: 0;
            top: 144px;
            width: 500px;
        }
        .space-below-button {
            height: 50px;
        }
      
        .settings-wrapper {
            position: unset;
        }
    `]
})
export class GameDetailSettingsComponent implements OnInit {

  public game$: Observable<Game> = this.store.select(getGame);

  constructor(public store: Store<State>) {
  }


  ngOnInit(): void {
    this.store.dispatch(new GetGameMessagesRequestAction());
    this.store.dispatch(new GetCurrentGameFromRouterRequestAction());

  }

}

