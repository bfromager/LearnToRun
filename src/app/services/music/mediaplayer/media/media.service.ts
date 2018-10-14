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
export class MediaService {
    public status: Subject<MediaStatus>;

    constructor() {
    }

    public load(file : string) {}
    public play() {}
    public pause() {}
    public stop() {}

    public fadeOut() : Promise<any> { return new Promise(resolve => {resolve(null)})};
    public fadeIn() : Promise<any> { return new Promise(resolve => {resolve(null)})}

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
