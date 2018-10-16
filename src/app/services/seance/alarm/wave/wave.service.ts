import {Injectable} from "@angular/core";
import {MediaService, MediaServiceFactory} from "../../../music/mediaplayer/media/media.service";
import {MediaStatus} from "../../../music/mediaplayer/media/media.model";
import {Subscription} from "rxjs/index";
import {Platform} from "@ionic/angular";

@Injectable({
    providedIn: 'root',
})
export class WaveService {
    private sub: Subscription;
    private mediaService: MediaService;

    constructor(platform: Platform) {
        this.mediaService = MediaServiceFactory(platform);
    }

    play(file: string): Promise <any> {
        return new Promise(resolve => {
            this.sub = this.mediaService.status.subscribe((status) => {
                if (status == MediaStatus.FINISHED /*|| status == MediaStatus.NONE*/) {
                    this.sub.unsubscribe();
                    resolve(null);
                }
            });
            this.mediaService.load(file);
            this.mediaService.play();
        });
    }
}



