import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { PortalImage, PortalImageFromServer } from "../../portal-image-management/store/portal-images.state";

@Injectable()
export class PortalImagesService {
    constructor(private http: HttpClient) {
    }

    getAll(path = '/') {
        return this.http.get(environment.api_url + `/media/list`, { params: { path } })
            .pipe(
                map((result: { items: PortalImageFromServer[] }) =>
                    (result.items || []).map(this.mapToPortalImage)
                )
            );
    }

    create(payload: PortalImage) {
        return this.http.post(environment.api_url + `/media`, this.mapFromPortalImage(payload))
            .pipe(
                map((result: PortalImageFromServer) =>
                    this.mapToPortalImage(result)
                )
            );
    }

    private mapToPortalImage(img: PortalImageFromServer): PortalImage {
        return {
            ...img,
            tags: img.tags ? img.tags.split(';') : []
        };
    }

    private mapFromPortalImage(img: PortalImage): PortalImageFromServer {
        return {
            ...img,
            tags: img.tags.join(';')
        };
    }
}
