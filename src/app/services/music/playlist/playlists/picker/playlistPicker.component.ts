import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActionSheetController} from "@ionic/angular";
import {PlaylistsService} from "../playlists.service";
import {Playlist} from "../../playlist";
import {Subject} from "rxjs/index";

@Component({
    selector: 'playlistPicker-component',
    templateUrl: 'playlistPicker.component.html',
})
export class PlaylistPickerComponent implements OnInit, OnDestroy {

    private buttons: any[] = [];
    private playlists : Playlist[] = [];
    public playlistChange: Subject<Playlist> = new Subject<Playlist>();


    constructor(private actionSheetController: ActionSheetController, private playlistsService: PlaylistsService) {}

    ngOnInit() {
        this.playlists = this.playlistsService.getPlaylists();
        this.populateActionSheet();
    }

    private populateActionSheet() {
        this.buttons.push(
        {
            text: 'Aucune',
            // icon: 'checkbox-outline',
            handler: () => {
                console.log('Aucune clicked');
            }
        });

        this.playlists.forEach((playlist, index) => {
            this.buttons.push(
                {
                    text: playlist.getName(),
                    // icon: 'square-outline',
                    handler: () => {
                        this.actionSheetHandler(playlist)
                    }
                });
        });

        this.buttons.push(
        {
            text: 'Cancel',
            icon: 'close',
            role: 'cancel',
            handler: () => {
                console.log('Cancel clicked');
            }
        });
    }

    private actionSheetHandler(playlist: Playlist) {
        console.log(playlist.getName() + ' actionSheetHandler');
        this.playlistChange.next(playlist);
    }

    ngOnDestroy() {
    }

    showActionSheet() {
        this.actionSheetController.create({
            header: 'Playlist',
            buttons: this.buttons,
            mode: "md"
        })
            .then ( (actionSheet) => {
                actionSheet.present();
                }
            );

    }
}
