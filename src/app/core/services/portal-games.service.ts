import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';


@Injectable()
export class PortalGamesService {
    list(): Observable<any[]> {
        return of([
            {
                id: 1,
                icon: '1',
                title: 'Van Nelle Fabriek het Zelf',
                description: 'Maecenas faucibus mollis interdum. Cras mattis consectetur purus sit amet fermentum',
                date: '14 mei 2020',
                category: 'Cultuur',
                country: 'Nederlands',
                private: true,
                rate: 4.7,
                reviews: 11,
                featured: false,
            },
            {
                id: 2,
                icon: '2',
                title: 'Media Quest',
                description: 'Maecenas faucibus mollis interdum. Cras mattis consectetur purus sit amet fermentum',
                date: '14 mei 2020',
                category: 'Politiek',
                country: 'Nederlands',
                private: true,
                rate: 4.6,
                reviews: 64,
                featured: true,
            },
            {
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
