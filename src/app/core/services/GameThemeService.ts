import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {forkJoin, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {GameTheme} from "../../game-themes/store/game-theme.state";


@Injectable()
export class GameThemeService {

    constructor(private http: HttpClient) {
    }

    getThemes(): Observable<any> {
        const global$ = this.http.get<any>(environment.api_url + `/game/theme/list/global`);
        const custom$ = this.http.get<any>(environment.api_url + `/game/theme/list/custom`);

        return forkJoin([global$, custom$])
            .pipe(
                map((res) => {
                    const result = {responses: [], items: []};

                    res.forEach(x => {
                        if (x.responses) {
                            x.responses = x.responses.map(gameThemeTransform);
                        } else {
                            x.responses = [];
                        }

                        if (!x.items) { x.items = [] }

                        result.responses.push(...x.responses);
                        result.items.push(...x.items);
                    });

                    return result;
                })
            );
    }

    createTheme(theme: GameTheme): Observable<any> {
        return this.http
            .post<any>(environment.api_url + '/game/theme/create', theme);
    }

}


const gameThemeTransform = (theme: any) => {
    if (theme.themeId) {
        theme.themeId = Number.parseInt(theme.themeId, 10);
    }
    return theme;
};


