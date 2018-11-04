import {Component, OnDestroy, OnInit} from "@angular/core";
import {Playlist} from "../playlist";
import {PlaylistsService} from "../playlists/playlists.service";
import {Subject} from "rxjs/index";
import {AlertController} from "@ionic/angular";

@Component({
    selector: 'playlist-edit-component',
    templateUrl: 'playlistEdit.component.html',
})
export class PlaylistEditComponent implements OnInit, OnDestroy {

    public playlist : Playlist = null;
    public playlistAddMp3: Subject<void> = new Subject<void>();

    constructor(private playlistsService: PlaylistsService, private alertController: AlertController) {
        this.playlist = this.playlistsService.getEditingPlaylist();
    }

    ngOnInit() {
    }
    ngOnDestroy() {
    }

    public rename(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.alertController.create({
                header: 'Nom de la playlist',
                inputs: [
                    {
                        name: 'playLitsName',
                        type: 'text',
                        // placeholder: 'Placeholder 1',
                        value: this.playlist.getName(),
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
                            let playlistName = inputs.playLitsName;
                            this.playlist.setName(playlistName);
                            this.playlistsService.save();
                            resolve(playlistName);
                        }
                    }
                ]
            })
                .then((alertForm) => {
                        alertForm.present().then(() => {
                            // const firstInput: any = document.querySelector('ion-alert input');
                            // firstInput.focus();
                            // return;
                        });
                    }
                );
        })
    }

    addMp3() {
        this.playlistAddMp3.next();
    }

    delMp3(index: number) {
        this.playlist.del(index);
        this.playlistsService.save();
    }

    reorder(event) {
        this.playlist.reorder(event.detail.from, event.detail.to);
        this.playlistsService.save();
    }
}
