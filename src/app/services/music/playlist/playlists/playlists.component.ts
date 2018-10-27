import {Component, OnDestroy, OnInit} from "@angular/core";
import {Playlist} from "../playlist";
import {PlaylistsService} from "./playlists.service";
@Component({
    selector: 'playlists-component',
    templateUrl: 'playlists.component.html',
})
export class PlaylistsComponent implements OnInit, OnDestroy {

    private playlists : Playlist[] = [];

    constructor(private playlistsService: PlaylistsService) {
    }

    ngOnInit() {
        this.playlists = this.playlistsService.getPlaylists();
    }
    ngOnDestroy() {
    }
}
