import {Component, OnDestroy, OnInit} from "@angular/core";
import {MediaPlayerService} from "./mediaPlayer.service";
import {PlaylistsService} from "../playlist/playlists.service";
@Component({
    selector: 'mediaPlayer-component',
    templateUrl: 'mediaPlayer.component.html',
})
export class MediaPlayerComponent implements OnInit, OnDestroy {

    constructor(private mediaPlayerService: MediaPlayerService, private playlistsService: PlaylistsService) {
    }

    ngOnInit() {
        let playlist = this.playlistsService.getPlaylists()[0];
        this.mediaPlayerService.setPlaylist(playlist);
    }
    ngOnDestroy() {
        this.mediaPlayerService.stop();
    }

    btnPlay(){
        this.mediaPlayerService.play();
    }
    btnStop(){
        this.mediaPlayerService.stop();
    }
    btnFadeOut(){
        this.mediaPlayerService.fadeOut();
    }
    btnFadeIn(){
        this.mediaPlayerService.fadeIn();
    }
    btnPause(){
        this.mediaPlayerService.pause();
    }



}
