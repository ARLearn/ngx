import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {GameMessage} from '../../game-messages/store/game-messages.state';
import {map} from 'rxjs/operators';


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

    listMessages(gameId: number): Observable<any[]> {
        return this.http
            .get<any>(environment.api_url + '/generalItems/gameId/' + gameId).pipe(
                map(res => res.generalItems ? res.generalItems.map(messageTransform) : []),
            );
    }

    deleteMessage(gameId: number, messageId: number) {

        return this.http
            .delete(environment.api_url + '/generalItems/gameId/' + gameId + '/itemId/' + messageId)
            .pipe(map(messageTransform));
    }

    postMessage(message: GameMessage) {
        console.log("message to post", message);
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
    if (message.lastModificationDate) {
        message.lastModificationDate = Number.parseInt(message.lastModificationDate, 10);
    }
    const refs = {};
    if (message.fileReferences) {
        message.fileReferences.map(refObject => refs[refObject.key] = refObject.fileReference);
    }
    message.fileReferences = refs;
    return message;
};
