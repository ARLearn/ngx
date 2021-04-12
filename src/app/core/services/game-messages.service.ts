import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ActionDependency, GameMessage, GeneralItemList} from '../../game-messages/store/game-messages.state';
import {map} from 'rxjs/operators';
import {Game} from "../../game-management/store/current-game.state";


@Injectable()
export class GameMessagesService {

    messageTypes = {
        'org.celstec.arlearn2.beans.generalItem.NarratorItem': 'createNarrator',
        'org.celstec.arlearn2.beans.generalItem.SingleChoiceTest': 'createSingleChoice',
    };

    constructor(private http: HttpClient) {
    }

    getMessage(messageId: number): Observable<GameMessage> {
        return this.http
            .get<any>(environment.api_url + '/generalItems/itemId/' + messageId).pipe(map(messageTransform));
    }

    //todo deprecated
    listMessages(gameId: number): Observable<any[]> {
        return this.http
            .get<any>(environment.api_url + '/generalItems/gameId/' + gameId).pipe(
                map(res => res.generalItems ? res.generalItems.map(messageTransform) : []),
            );
    }


    listMessagesWithCursor(gameId: string, cursor: string): Observable<GeneralItemList> {
        return this.http
            .get<GeneralItemList>(environment.api_url + '/generalItems/gameId/' + gameId + '/cursor/' + cursor).pipe(
                map(res => {
                    res.generalItems = res.generalItems ? res.generalItems.map(messageTransform) : [];
                    return res;
                }),
            );
    }

    deleteMessage(gameId: string, messageId: number): Observable<GameMessage> {

        return this.http
            .delete(environment.api_url + '/generalItems/gameId/' + gameId + '/itemId/' + messageId)
            .pipe(map(messageTransform));
    }

    postMessage(message: GameMessage): Observable<GameMessage> {
        message = Object.assign({}, message);
        if (message.fileReferences) {
            message.fileReferences = Object.keys(message.fileReferences).map(key => Object.assign({
                key: key,
                type: 'org.celstec.arlearn2.beans.generalItem.FileReference',
                fileReference: message.fileReferences[key]
            }));

        }
        const wrapper = {
            dependencyAsString: JSON.stringify(message)
        };

        return this.http
            .post(environment.api_url + '/generalItems/wrapperpost', wrapper)
            .pipe(map(messageTransform));
    }


    newMessage(message: GameMessage) {
        return this.http
            .post(environment.api_url + '/generalItems/' + this.messageTypes[message.type], message);

    }
}

const messageTransform = (message: any) => {
    if (message.id) {
        message.id = Number.parseInt(message.id, 10);
    }
    if (message.gameId) {
        message.gameId = Number.parseInt(message.gameId, 10);
    }
    if (message.dependsOn && (<ActionDependency>message.dependsOn).generalItemId) {
        (<ActionDependency>message.dependsOn).generalItemId = parseInt('' + (<ActionDependency>message.dependsOn).generalItemId, 10);
    }
    if (message.lastModificationDate) {
        message.lastModificationDate = Number.parseInt(message.lastModificationDate, 10);
    }
    const refs = {};
    if (message.fileReferences) {
        message.fileReferences.map(refObject => refs[refObject.key] = refObject.fileReference);
    }
    message.fileReferences = refs;
    if (!message.showFeedback) {
        message.showFeedback = false;
    }
    if (
        message['type'] === 'org.celstec.arlearn2.beans.generalItem.MultipleChoiceImageTest'
        || message['type'] === 'org.celstec.arlearn2.beans.generalItem.SingleChoiceImageTest'
        || message['type'] === 'org.celstec.arlearn2.beans.generalItem.SingleChoiceTest'
        || message['type'] === 'org.celstec.arlearn2.beans.generalItem.MultipleChoiceTest'
    ) {
        if (!message['answers']) {
            message['answers'] = [];
        }
    }
    return message;
};
