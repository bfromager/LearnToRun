import {Injectable} from '@angular/core';
import {Platform} from "@ionic/angular";

@Injectable({
    providedIn: 'root',
})
export class MediaService {

    constructor(private platform: Platform) {
        console.log("MediaServiceFactory", platform.platforms());
    }
}
