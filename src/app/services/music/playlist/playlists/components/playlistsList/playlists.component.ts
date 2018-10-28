import {Component, OnDestroy, OnInit} from "@angular/core";
import {Playlist} from "../../../playlist";
import {PlaylistsService} from "../../playlists.service";
import {Subject} from "rxjs/index";
@Component({
    selector: 'playlists-component',
    templateUrl: 'playlists.component.html',
})
export class PlaylistsComponent implements OnInit, OnDestroy {

    private playlists : Playlist[] = [];
    public playlistClick: Subject<Playlist> = new Subject<Playlist>();

    constructor(private playlistsService: PlaylistsService) {
    }

    ngOnInit() {
        this.playlists = this.playlistsService.getPlaylists();
    }
    ngOnDestroy() {
    }

    itemClick(playlist: Playlist){
        this.playlistClick.next(playlist);
    }
}
