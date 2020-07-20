import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";


@Injectable()
export class GameThemeService {

    constructor(private http: HttpClient) {
    }

    getThemes(): Observable<any> {

        return this.http
            .get<any>(environment.api_url + `/game/theme/list/global`)
            .pipe(
                map(res => {
                    if (res.responses) {
                        res.responses = res.responses.map(gameThemeTransform);

                    } else {
                        res.responses = [];
                    }
                    return res;
                })
            );
    }


}
const gameThemeTransform = (theme: any) => {
    if (theme.themeId) {
        theme.themeId = Number.parseInt(theme.themeId, 10);
    }
    return theme;
};


