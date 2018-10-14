import {Injectable} from '@angular/core';
import {Platform} from "@ionic/angular";
import {MediaCordova} from "./media.cordova";
import {MediaFake} from "./media.fake";
import {Subject} from "rxjs/index";
import {MediaStatus} from "./media.model";

@Injectable({
    providedIn: 'root',
    useFactory: MediaServiceFactory,
    deps: [Platform],
})
export abstract class MediaService {
    abstract status: Subject<MediaStatus>;

    constructor() {
    }

    abstract load(file : string);
    abstract play();
    abstract pause();
    abstract stop();

    abstract fadeOut() : Promise<any>;
    abstract fadeIn() : Promise<any>;

}

function MediaServiceFactory(platform: Platform) {
    if (platform.is('cordova')) {
        console.log("MediaServiceFactory", "cordova");
        return new MediaCordova ();
    }
    else {
        console.log("MediaServiceFactory","not cordova");
        return new MediaFake ();
    }
}
