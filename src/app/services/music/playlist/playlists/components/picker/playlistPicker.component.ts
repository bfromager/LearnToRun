import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActionSheetController} from "@ionic/angular";
import {PlaylistsService} from "../../playlists.service";
import {Playlist} from "../../../playlist";
import {Subject, Subscription} from "rxjs/index";

@Component({
    selector: 'playlistPicker-component',
    templateUrl: 'playlistPicker.component.html',
    styleUrls: ['playlistPicker.actionsheet.scss']
})
export class PlaylistPickerComponent implements OnInit, OnDestroy {

    private buttons: any[] = [];
    private playlists : Playlist[] = [];
    public playlistSelect: Subject<Playlist> = new Subject<Playlist>();
    private playlistChangeSub: Subscription;


    constructor(private actionSheetController: ActionSheetController, private playlistsService: PlaylistsService) {}

    ngOnInit() {
        this.populateActionSheet(this.playlistsService.getPlaylists());

        this.playlistChangeSub =  this.playlistsService.playlistsChange.subscribe(
            (playlists: Playlist[]) => {
                this.populateActionSheet(playlists);
            }
        );
    }

    ngOnDestroy() {
        this.playlistChangeSub.unsubscribe();
    }

    private populateActionSheet(playlists: Playlist[]) {
        this.playlists = playlists;
        this.buttons = [];
        this.buttons.push(
        {
            text: 'Aucune',
            // icon: 'checkmark',
            handler: () => {
                console.log('Aucune clicked');
            }
        });

        this.playlists.forEach((playlist, index) => {
            this.buttons.push(
                {
                    text: playlist.getName(),
                    // icon: 'checkmark',
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
        this.playlistSelect.next(playlist);
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
