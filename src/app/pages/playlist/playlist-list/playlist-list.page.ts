import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {PlaylistsComponent} from "../../../services/music/playlist/playlists/components/playlistsList/playlists.component";
import {Playlist} from "../../../services/music/playlist/playlist";
import {Subscription} from "rxjs/index";
import {PlaylistsService} from "../../../services/music/playlist/playlists/playlists.service";

// https://angularfirebase.com/lessons/ionic-4-routing-and-navigation-guide/

@Component({
    selector: 'app-playlist-list',
    templateUrl: './playlist-list.page.html',
    styleUrls: ['./playlist-list.page.scss'],
})
export class PlaylistListPage implements OnInit, OnDestroy {
    @ViewChild(PlaylistsComponent) playlists: PlaylistsComponent;
    private playlistClickSub: Subscription;

    constructor(private router: Router, private playlistsService: PlaylistsService) { }

    ngOnInit() {
        this.playlistClickSub = this.playlists.playlistClick.subscribe(
            (playlist: Playlist) => {
                this.playlistsService.setEditingPlaylist(playlist);
                this.router.navigateByUrl('/playlist-edit');
            }
        );
    }

    ngOnDestroy() {
        this.playlistClickSub.unsubscribe();
    }
}
