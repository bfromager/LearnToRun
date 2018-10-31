import {Component, OnDestroy, OnInit} from "@angular/core";
import {Playlist} from "../../../playlist";
import {PlaylistsService} from "../../playlists.service";
import {Subject} from "rxjs/index";
import {AlertController} from "@ionic/angular";
@Component({
    selector: 'playlists-component',
    templateUrl: 'playlists.component.html',
})
export class PlaylistsComponent implements OnInit, OnDestroy {

    private playlists : Playlist[] = [];
    public playlistClick: Subject<Playlist> = new Subject<Playlist>();
    public playlistCreate: Subject<string> = new Subject<string>();

    constructor(private playlistsService: PlaylistsService, private alertController: AlertController) {
    }

    ngOnInit() {
        this.playlists = this.playlistsService.getPlaylists();
    }
    ngOnDestroy() {
    }

    itemClick(playlist: Playlist){
        this.playlistClick.next(playlist);
    }

    showAlert() {
        this.alertController.create({
            header: 'Nom de la playlist',
            inputs: [
                {
                    name: 'playLitsName',
                    type: 'text',
                    // placeholder: 'Placeholder 1',
                    value: 'Nouvelle playlist',
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    // handler: () => {
                    //     console.log('Confirm Cancel');
                    // }
                },
                {
                    text: 'Ok',
                    handler: (inputs) => {
                        this.createPlaylist(inputs.playLitsName);
                    }
                }
            ]
        })
            .then ( (alertForm) => {
                    alertForm.present();
                }
            );
    }

    private createPlaylist(playlistName) {
        console.log(playlistName);
        this.playlistsService.add(playlistName);
        this.playlistCreate.next(playlistName);
    }
}
