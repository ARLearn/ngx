import {Component, OnInit} from '@angular/core';
import {GameDetailScreensComponent} from '../game-detail-screens/game-detail-screens.component';
import {Observable} from "rxjs";
import {getFilteredMessagesSelector} from "../../store/game-messages.selector";
import {GameMessage} from "../../store/game-messages.state";
import {
    GameMessageDirectSaveAction,
    GameMessageEditAction,
    GameMessageEditCompletedAction
} from "../../../game-message/store/game-message.actions";
import {getEditMessageSelector} from "../../../game-message/store/game-message.selector";
import {first} from "rxjs/operators";

@Component({
    selector: 'app-game-detail-flowchart',
    template: `
        <app-game-detail-navbar [game]="game$|async"></app-game-detail-navbar>

        <div *ngIf="(messages$|async).length !== 0 ">
            <lib-wireflow
                    (selectMessage)="selectMessage($event)"
                    [messages]="messages$ |async"
                    (messagesChange)="messagesChange($event)"
                    (deselectMessage)="deselectMessage($event)"
                    (noneSelected)="noneSelected()"
                    [lang]="lang"
            ></lib-wireflow>
        </div>

        <app-preview-pane class="pos-preview-pane" *ngIf="editMessage$|async">
        </app-preview-pane>


    `,
    styles: [`
        .pos-preview-pane {
            position: fixed;
            right: 0px;
            top: 0px;
            background: #FAFAFA;
            width: 429px;
            height: 100vh;
            z-index: 1;
            box-shadow: 0px 9px 18px #0000002E;
        }
    `]
})
export class GameDetailFlowchartComponent extends GameDetailScreensComponent {
    editMessage$: Observable<GameMessage> = this.store.select(getEditMessageSelector);
    public messages$: Observable<any> = this.store.select(getFilteredMessagesSelector);
    lang = 'en';

    // messages = JSON.parse('[{"type":"org.celstec.arlearn2.beans.generalItem.ScanTag","gameId":5739463179239424,"deleted":false,"lastModificationDate":1588158572406,"id":5176513225818112,"scope":"user","name":"scan item","description":"","dependsOn":{"type":"org.celstec.arlearn2.beans.dependencies.ActionDependency","action":"answer_i1FU7","generalItemId":5720434527961088},"autoLaunch":false,"authoringX":544,"authoringY":348,"message":true,"fileReferences":{},"showFeedback":false},{"type":"org.celstec.arlearn2.beans.generalItem.NarratorItem","gameId":5739463179239424,"deleted":false,"lastModificationDate":1586417525590,"id":5710606233501696,"scope":"user","name":"introductie","description":"","dependsOn":{"type":"org.celstec.arlearn2.beans.dependencies.ActionDependency","action":"answer_qkceR","generalItemId":5720434527961088},"autoLaunch":false,"authoringX":774.7499,"authoringY":119.9296,"message":true,"fileReferences":{},"showFeedback":false},{"type":"org.celstec.arlearn2.beans.generalItem.MultipleChoiceTest","gameId":5739463179239424,"deleted":false,"lastModificationDate":1586339441632,"id":5720434527961088,"scope":"user","name":"meerkeuze","description":"","autoLaunch":false,"authoringX":167.4515,"authoringY":86.8048,"fileReferences":{"background":"/game/5739463179239424/einde.jpg"},"answers":[{"type":"org.celstec.arlearn2.beans.generalItem.MultipleChoiceAnswerItem","isCorrect":true,"feedback":"","answer":"optie 1","id":"qkceR"},{"type":"org.celstec.arlearn2.beans.generalItem.MultipleChoiceAnswerItem","isCorrect":false,"feedback":"","answer":"optie 2","id":"i1FU7"}],"showFeedback":true,"message":true},{"type":"org.celstec.arlearn2.beans.generalItem.NarratorItem","gameId":5739463179239424,"deleted":false,"lastModificationDate":1588158195904,"id":5724554341122048,"scope":"user","name":"olifant","description":"","dependsOn":{"type":"org.celstec.arlearn2.beans.dependencies.AndDependency","dependencies":[{"type":"org.celstec.arlearn2.beans.dependencies.ActionDependency","action":"next","generalItemId":"5176513225818112"},{"type":"org.celstec.arlearn2.beans.dependencies.ActionDependency","action":"testqr","generalItemId":"5176513225818112"},{"type":"org.celstec.arlearn2.beans.dependencies.ActionDependency","action":"testqr","generalItemId":"5176513225818112"},{"type":"org.celstec.arlearn2.beans.dependencies.ActionDependency","action":"qrlabel","generalItemId":"5176513225818112"},{"type":"org.celstec.arlearn2.beans.dependencies.ActionDependency","action":"qrlabel","generalItemId":"5176513225818112"},{"type":"org.celstec.arlearn2.beans.dependencies.ActionDependency","action":"qrlabel","generalItemId":"5176513225818112"}]},"autoLaunch":false,"authoringX":1181,"authoringY":334,"message":true,"fileReferences":{},"showFeedback":false}]')
    messagesChange(messages: GameMessage[]) {
        console.log('FROM WIREFLOW', messages);
        messages.map(message => this.store.dispatch(new GameMessageDirectSaveAction(message)));
    }

    ngOnInit() {
        super.ngOnInit();

        this.messages$

            .subscribe((messages) => {
            console.log("LOG messages", messages);
            console.log("LOG stringify", JSON.stringify(messages));
        });
    }

    selectMessage($event) {
        console.log("message selected", $event);
        this.store.dispatch(new GameMessageEditCompletedAction($event));
    }

    deselectMessage($event) {

    }

    noneSelected() {

    }
}

