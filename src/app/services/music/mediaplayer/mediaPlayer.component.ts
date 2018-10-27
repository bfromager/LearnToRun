import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {MediaPlayerService} from "./mediaPlayer.service";
// import {PlaylistsService} from "../playlist/playlists/playlists.service";
import {PlaylistPickerComponent} from "../playlist/playlists/picker/playlistPicker.component";
import {Playlist} from "../playlist/playlist";
@Component({
    selector: 'mediaPlayer-component',
    templateUrl: 'mediaPlayer.component.html',
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
    @ViewChild(PlaylistPickerComponent) playlistPicker: PlaylistPickerComponent;

    constructor(private mediaPlayerService: MediaPlayerService/*, private playlistsService: PlaylistsService*/) {
    }

    ngOnInit() {
        // let playlist = this.playlistsService.getPlaylists()[0];

        this.playlistPicker.playlistChange.subscribe(
            (playlist: Playlist) => {
                this.mediaPlayerService.setPlaylist(playlist);
            }
        );
    }
    ngOnDestroy() {
        this.mediaPlayerService.stop();
    }
}
