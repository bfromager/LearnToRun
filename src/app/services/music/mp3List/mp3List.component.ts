import {Component, OnInit} from "@angular/core";
import {Mp3} from "../mp3.interface";
import {Mp3ListService} from "./mp3list.service";
import {ToastController} from "@ionic/angular";
import {PlaylistsService} from "../playlist/playlists/playlists.service";
import {Playlist} from "../playlist/playlist";

//https://www.joshmorony.com/a-guide-to-styling-an-ionic-2-application/

@Component({
    selector: 'mp3List-component',
    templateUrl: 'mp3List.component.html',
})
export class Mp3ListComponent implements OnInit {

    private mp3List: Mp3[] = [];

    constructor(private mp3ListService: Mp3ListService, private toastCtrl: ToastController, private playlistsService: PlaylistsService) {
    }

    ngOnInit() {
        this.mp3ListService.mp3Subject.subscribe(
            (mp3: Mp3) => {
                this.mp3List.push(mp3);
                // console.log(mp3.name);
            }
        );
        this.mp3ListService.updateList();
    }

    btnAdd(mp3: Mp3){
        this.presentToast(mp3);
        let editingPlaylist : Playlist = this.playlistsService.getEditingPlaylist();
        editingPlaylist.add(mp3);
        this.playlistsService.save();
    }

    private presentToast(mp3: Mp3) {
        this.toastCtrl.create({
            message: mp3.name + ' ajouté',
            duration: 1000,
            position: 'bottom'
        }).then((toast) => {
                toast.present();
        });
    }

}
