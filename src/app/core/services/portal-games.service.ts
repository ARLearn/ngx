import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Player} from "../../player-management/store/player.state";
import {Game} from "../../game-management/store/current-game.state";
import {PortalGame} from "../../portal-management/store/portal-games.state";


@Injectable()
export class PortalGamesService {
    constructor(private http: HttpClient) {
    }

    search(query: string): Observable<PortalGame[]> {

        return this.http
            .get<any>(environment.api_url + '/games/library/search/' + query)
            .pipe(map(result => result.games));
    }

    list(): Observable<any[]> {
        return of([
            {
                gameId: 1,
                icon: '1',
                title: 'Van Nelle Fabriek het Zelf',
                description: 'Maecenas faucibus mollis interdum. Cras mattis consectetur purus sit amet fermentum',
                date: '14 mei 2020',
                category: 'Cultuur',
                language: 'Nederlands',
                private: true,
                rate: 4.7,
                reviews: 11,
                featured: false,
            },
            {
                gameId: 2,
                icon: '2',
                title: 'Media Quest',
                description: 'Maecenas faucibus mollis interdum. Cras mattis consectetur purus sit amet fermentum',
                date: '14 mei 2020',
                category: 'Politiek',
                language: 'Nederlands',
                private: true,
                rate: 4.6,
                reviews: 64,
                featured: true,
            },
            {
                gameId: 3,
                icon: '3',
                title: 'Beleven en vinden',
                description: 'Maecenas faucibus mollis interdum. Cras mattis consectetur purus sit amet fermentum',
                date: '14 mei 2020',
                category: 'Veiligheid',
                language: 'Nederlands',
                private: true,
                rate: 4.4,
                reviews: 14,
                featured: true,
            },
        ]);
    }

    get(id: string): Observable<any> {
        return of({
            id: 3,
            icon: '3',
            title: 'Beleven en vinden',
            description: 'Maecenas faucibus mollis interdum. Cras mattis consectetur purus sit amet fermentum',
            date: '14 mei 2020',
            category: 'Veiligheid',
            country: 'Nederlands',
            private: true,
            rate: 4.4,
            reviews: 14,
            featured: true,
        });
    }
}
