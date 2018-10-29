import {Injectable, OnDestroy} from "@angular/core";

import {MediaService} from "./media/media.service";
import {MediaStatus} from "./media/media.model";
import {Playlist} from "../playlist/playlist";
import {Subscription} from "rxjs/index";
import {isNullOrUndefined, isUndefined} from "util";

@Injectable({
    providedIn: 'root',
})
export class MediaPlayerService implements OnDestroy{

    private fileLoaded = false;
    private changePlaylist = false;
    // private curFileName: string = "";
    private mediaStatus: MediaStatus = MediaStatus.NONE;
    private playlist: Playlist = null;
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
        if (this.playlist == playlist) return;

        this.playlist = playlist;
        if (this.playlist != null) {
            this.playlist.initPlaylist();
        }

        if (this.mediaStatus == MediaStatus.STARTING || this.mediaStatus == MediaStatus.RUNNING) {
            this.changePlaylist = true;
            this.stop();
        }
    }

    private load(file: string) {
        this.mediaService.load(file);
        this.fileLoaded = true;
    }

    private loadIfNecessary()  : Promise<boolean> {
        return new Promise((resolve,reject) => {
            if (!this.fileLoaded) {
                this.playlist.getNextMp3()
                    .then((nextMp3) => {
                        this.load(nextMp3.path);
                        resolve(true);
                    })
                    .catch((error)=>{
                        reject(error);
                    });
            } else {
                resolve(true);
            }
        });
    }

    play() {
        if (this.playlist == null || this.mediaStatus == MediaStatus.STARTING || this.mediaStatus == MediaStatus.RUNNING) return;
        // if (this.curFileName == "") return;

        this.loadIfNecessary()
            .then(() => {
                this.mediaService.play();
            })
            .catch((error)=>{
                alert(error);
                return;
            });
    }

    pause() {
        this.mediaService.pause();
    }

    stop() {
        // this.fileLoaded = false;
        this.mediaService.stop();
        this.mediaStatus = MediaStatus.STOPPED;
    }

    private onPlayStatus(status: MediaStatus) {
        console.log(status);
        this.mediaStatus = status;
        if (status == MediaStatus.FINISHED /*|| status == MediaStatus.NONE*/) {
            this.fileLoaded = false;
            this.play();
        }
        if (this.changePlaylist && (status == MediaStatus.STOPPED)) {
            this.changePlaylist = false;
            this.fileLoaded = false;
            this.play();
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