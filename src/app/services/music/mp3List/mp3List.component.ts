import {Component, OnInit} from "@angular/core";
import {Mp3} from "../mp3/mp3.interface";
import {Mp3ListService} from "./mp3list.service";
import {ToastController} from "@ionic/angular";
import {PlaylistsService} from "../playlist/playlists/playlists.service";
import {Playlist} from "../playlist/playlist";
import {Mp3TagService} from "../mp3/mp3Tag.service";
import * as util from "util";

//https://www.joshmorony.com/a-guide-to-styling-an-ionic-2-application/

@Component({
    selector: 'mp3List-component',
    templateUrl: 'mp3List.component.html',
})
export class Mp3ListComponent implements OnInit {

    private mp3List: Mp3[] = [];

    constructor(private mp3ListService: Mp3ListService, private mp3TagService: Mp3TagService, private toastCtrl: ToastController, private playlistsService: PlaylistsService) {
    }

    ngOnInit() {
        this.mp3ListService.mp3Subject.subscribe(
            (mp3: Mp3) => {
                this.mp3List.push(mp3);
                // this.mp3TagService.tagMp3(mp3);

                //     .then( result => {
                //     })
                //     .catch( result => {
                //     });
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

    btnTag(mp3: Mp3){
        this.mp3TagService.tagMp3(mp3);
        console.log(mp3.artist + "|" + mp3.album);
    }

    private presentToast(mp3: Mp3) {
        this.toastCtrl.create({
            message: (mp3.title ? mp3.title : mp3.name) + ' ajouté',
            duration: 1000,
            position: 'bottom'
        }).then((toast) => {
                toast.present();
        });
    }

}
