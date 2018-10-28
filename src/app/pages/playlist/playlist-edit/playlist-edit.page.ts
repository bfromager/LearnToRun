import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {PlaylistEditComponent} from "../../../services/music/playlist/components/playlistEdit.component";
import {Playlist} from "../../../services/music/playlist/playlist";

@Component({
    selector: 'app-playlist-edit',
    templateUrl: './playlist-edit.page.html',
    styleUrls: ['./playlist-edit.page.scss'],
})
export class PlaylistEditPage implements OnInit {
    @ViewChild(PlaylistEditComponent) playlistEdit: PlaylistEditComponent;

    public playlist: Playlist;

    constructor(private router: Router) { }

    ngOnInit() {
        this.playlist = this.playlistEdit.playlist;
    }

    mp3(){
        this.router.navigateByUrl('/mp3-list');
    }
}
