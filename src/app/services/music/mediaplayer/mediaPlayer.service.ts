import {Injectable, OnDestroy} from "@angular/core";

import {MediaService} from "./media/media.service";
import {MediaStatus} from "./media/media.model";
import {Playlist} from "../playlist/playlist";
import {Subscription} from "rxjs/index";

@Injectable({
    providedIn: 'root',
})
export class MediaPlayerService implements OnDestroy{

    private fileLoaded = false;
    private curFileName: string = "";
    private mediaStatus: MediaStatus = MediaStatus.NONE;
    private playlist: Playlist;
    private sub: Subscription = null;

    constructor(private mediaService: MediaService) {
        this.sub = this.mediaService.status.subscribe((status) => {
            this.onPlayStatus(status);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }


    public setPlaylist(playlist: Playlist) {
        this.playlist = playlist;
        this.playlist.getNextFile()
            .then((nextFile) => {
                this.curFileName = nextFile;
            })
            .catch((error)=>{
                alert(error)
            });
    }

    private load(file: string) {
        this.mediaService.load(file);
        this.fileLoaded = true;
    }

    play() {
        if (this.mediaStatus == MediaStatus.STARTING || this.mediaStatus == MediaStatus.RUNNING) return;
        if (this.curFileName == "") return;

        if (!this.fileLoaded) this.load(this.curFileName);
        this.mediaService.play();
    }

    pause() {
        this.mediaService.pause();
    }

    stop() {
        this.fileLoaded = false;
        this.mediaService.stop();
    }

    private onPlayStatus(status: MediaStatus) {
        console.log(status);
        this.mediaStatus = status;
        if (status == MediaStatus.FINISHED /*|| status == MediaStatus.NONE*/) {
            this.fileLoaded = false;

            this.playlist.getNextFile().then((nextFile) => {
                this.curFileName = nextFile;
                if (status == MediaStatus.FINISHED) {
                    this.play();
                }
            })
        }
    }

    fadeOut() : Promise<any> {
        return new Promise(resolve => {
            this.mediaService.fadeOut().then(()=>{
                    resolve(null)
            });
        });
    }

    fadeIn()  : Promise<any> {
        return new Promise(resolve => {
            this.mediaService.fadeIn().then(()=>{
                resolve(null)
            });
        });
    }
}