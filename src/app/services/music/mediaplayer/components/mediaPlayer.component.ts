import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {MediaPlayerService} from "../mediaPlayer.service";
// import {PlaylistsService} from "../playlist/playlists/playlists.service";
import {PlaylistPickerComponent} from "../../playlist/playlists/components/picker/playlistPicker.component";
import {Playlist} from "../../playlist/playlist";
import {Subscription} from "rxjs/index";
@Component({
    selector: 'mediaPlayer-component',
    templateUrl: 'mediaPlayer.component.html',
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
    @ViewChild(PlaylistPickerComponent) playlistPicker: PlaylistPickerComponent;
    private playlistSelectSub: Subscription;

    constructor(private mediaPlayerService: MediaPlayerService/*, private playlistsService: PlaylistsService*/) {
    }

    ngOnInit() {
        this.playlistSelectSub =  this.playlistPicker.playlistSelect.subscribe(
            (playlist: Playlist) => {
                this.mediaPlayerService.setPlaylist(playlist);
            }
        );
    }
    ngOnDestroy() {
        this.playlistSelectSub.unsubscribe();
        this.mediaPlayerService.stop();
    }
}
