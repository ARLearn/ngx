import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {forkJoin, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {catchError, map} from "rxjs/operators";
import {GameTheme} from "../../game-themes/store/game-theme.state";
import {CATEGORY_CUSTOM_THEMES} from "../../game-themes/store/game-theme.selectors";


@Injectable()
export class GameThemeService {

    constructor(private http: HttpClient) {
    }

    getGlobalThemes(): Observable<any> {
        return  this.http.get<any>(environment.api_url + `/game/theme/list/global`);
    }
    getThemes(): Observable<any> {
        const global$ = this.http.get<any>(environment.api_url + `/game/theme/list/global`);
        const custom$ = this.http.get<any>(environment.api_url + `/game/theme/list/custom`);

        return forkJoin([global$, custom$])
            .pipe(

                map(([global, custom]) => {
                    if (custom.items) {
                        custom.items.forEach(x => x.category = CATEGORY_CUSTOM_THEMES);
                    }

                    const result = {responses: [], items: []};

                    [global, custom].forEach(x => {
                        if (x.responses) {
                            x.responses = x.responses.map(gameThemeTransform);
                        } else {
                            x.responses = [];
                        }

                        if (!x.items) {
                            x.items = [];
                        }

                        result.responses.push(...x.responses);
                        result.items.push(...x.items);
                    });

                    return result;
                }),
                catchError(error => global$)
            );
    }

    createTheme(theme: GameTheme): Observable<any> {
        return this.http
            .post<any>(environment.api_url + '/game/theme/create', theme)
            .pipe(map(theme => {
                theme.category = CATEGORY_CUSTOM_THEMES;
                return theme;
            }));
    }

    deleteTheme(themeId: number): Observable<any> {
        return this.http
            .delete<any>(environment.api_url + '/game/theme/' + themeId);
    }

}


const gameThemeTransform = (theme: any) => {
    if (theme.themeId) {
        theme.themeId = Number.parseInt(theme.themeId, 10);
    }
    return theme;
};


