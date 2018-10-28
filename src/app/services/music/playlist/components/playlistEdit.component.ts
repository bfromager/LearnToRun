import {Component, OnDestroy, OnInit} from "@angular/core";
import {Playlist} from "../playlist";
import {PlaylistsService} from "../playlists/playlists.service";
// import {Subject} from "rxjs/index";
@Component({
    selector: 'playlist-edit-component',
    templateUrl: 'playlistEdit.component.html',
})
export class PlaylistEditComponent implements OnInit, OnDestroy {

    public playlist : Playlist = null;
    // public playlistClick: Subject<Playlist> = new Subject<Playlist>();

    constructor(private playlistsService: PlaylistsService) {
        this.playlist = this.playlistsService.getEditingPlaylist();
    }

    ngOnInit() {
    }
    ngOnDestroy() {
    }

    // itemClick(playlist: Playlist){
    //     this.playlistClick.next(playlist);
    // }
}
