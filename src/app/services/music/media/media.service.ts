import {Injectable} from '@angular/core';
import {Platform} from "@ionic/angular";
import {MediaCordova} from "./media.cordova";
import {MediaFake} from "./media.fake";

@Injectable({
    providedIn: 'root',
    useFactory: MediaServiceFactory,
    deps: [Platform],
})
export class MediaService {

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
        console.log("cordova");
        return new MediaCordova ();
    }
    else {
        console.log("not cordova");
        return new MediaFake ();
    }
}
