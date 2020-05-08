import {Component, OnInit} from '@angular/core';

import {ActionDependency, GameMessage} from "../../../../../game-messages/store/game-messages.state";
import {getEditMessageSelector} from "../../../../store/game-message.selector";
import {State} from "../../../../../core/reducers";
import {FormControl} from "@angular/forms";
import {select, Store} from '@ngrx/store';

import {map, startWith} from "rxjs/operators";
import {Observable} from 'rxjs';
import {combineLatest} from 'rxjs';

import {getMessagesSelector} from "../../../../../game-messages/store/game-messages.selector";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {GameMessageUpdateAnswerAction, GameMessageUpdateDependencyAction} from "../../../../store/game-message.actions";
import { iCanWrite } from 'src/app/game-management/store/current-game.selector';

@Component({
    selector: 'app-dependency-read-temp',
    templateUrl: './dependency-read-temp.component.html',
    styleUrls: ['./dependency-read-temp.component.css']
})
export class DependencyReadTempComponent {

    message$: Observable<GameMessage> = this.store.select(getEditMessageSelector);
    allmessages$: Observable<GameMessage[]> = this.store.select(getMessagesSelector);
    public iCanWrite: Observable<boolean> = this.store.pipe(select(iCanWrite));

    stateCtrl = new FormControl('');
    filteredMessages: Observable<GameMessage[]>;
    localOk: boolean = false;

    constructor(
        private store: Store<State>,
    ) {
        this.filteredMessages = combineLatest([
            this.stateCtrl.valueChanges.pipe(startWith('')),
            this.store.pipe(select(getMessagesSelector))
        ]).pipe(
            map(([value, messages]: [GameMessage, GameMessage[]]) =>
                value ? this._filterMessages(value, messages) : messages.slice())
        );
        this.stateCtrl.valueChanges.pipe(
            map(val => {
                console.log("val is", val);
            })
        );
        var subscription = this.message$.subscribe((m) => {
            // this.stateCtrl.setValue(m);

            setTimeout(() => {
                subscription.unsubscribe();
                if (m.dependsOn) {
                    const dependency: ActionDependency = <ActionDependency>m.dependsOn;
                    const id = Number.parseInt('' + dependency.generalItemId, 10);
                    subscription = this.store.select(getMessagesSelector).subscribe(ms => {
                        const temp = ms.filter((am) => am.id == id)[0];
                        this.stateCtrl.setValue(temp);
                        setTimeout(() => {
                            subscription.unsubscribe();
                        }, 1000);
                    });
                }

            }, 1000);

        });
    }

    slideChange(changeEvent: MatSlideToggleChange) {
        if (changeEvent.checked) {

            this.localOk = true;

            this.store.dispatch(new GameMessageUpdateDependencyAction({
                delete: true
            }));
        } else {

            this.localOk = false;

        }
    }

    private _filterMessages(value: any, players: GameMessage[]): GameMessage[] {
        let filterValue = '';
        if (value.name) {
            this.store.dispatch(new GameMessageUpdateDependencyAction({
                delete: false,
                id: value.id,
                action: "read"
            }));
            filterValue = value.name.toLowerCase();
        } else {
            filterValue = value.toLowerCase();
        }

        return players.filter(p => {
            // console.log("play", p);
            return p.name && p.name.toLowerCase().indexOf(filterValue) === 0;
        });
    }

    displayMessage(message) {
        return message ? message.name : "";

    }

    depChange(event: any) {
        console.log("change", event);
    }
}
