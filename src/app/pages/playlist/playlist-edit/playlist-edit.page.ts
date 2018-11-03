import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {PlaylistEditComponent} from "../../../services/music/playlist/components/playlistEdit.component";
import {Playlist} from "../../../services/music/playlist/playlist";
import {Subscription} from "rxjs/index";

@Component({
    selector: 'app-playlist-edit',
    templateUrl: './playlist-edit.page.html',
    styleUrls: ['./playlist-edit.page.scss'],
})
export class PlaylistEditPage implements OnInit {
    @ViewChild(PlaylistEditComponent) playlistEdit: PlaylistEditComponent;

    public playlist: Playlist;
    public playlistName: string;
    private playlistAddMp3Sub: Subscription;

    constructor(private router: Router) {
    }

    ngOnInit() {
        this.playlist = this.playlistEdit.playlist;
        this.playlistName = this.playlist.getName();
        this.playlistAddMp3Sub = this.playlistEdit.playlistAddMp3.subscribe(
            () => {
                this.router.navigateByUrl('/mp3-list');
            }
        )
    }

    ngOnDestroy() {
        this.playlistAddMp3Sub.unsubscribe();
    }

    rename() {
        this.playlistEdit.rename().then((name)=>{this.playlistName = name;});
    }
}
