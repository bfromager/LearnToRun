import {Injectable} from "@angular/core";
import {Playlist, PlaylistFactoryService, PlaylistInterface} from "../playlist";
import {Storage} from "@ionic/storage";
import {Subject} from "rxjs/index";

@Injectable({
    providedIn: 'root',
})
export class PlaylistsService {
    private playlists : Playlist[] = [];
    private editingPlaylist: Playlist = null;
    public playlistsChange: Subject<Playlist[]> = new Subject<Playlist[]>();


    constructor(private playlistFactoryService: PlaylistFactoryService, private storage: Storage) {
        this.load();
    }

    getEditingPlaylist(): Playlist {
        return this.editingPlaylist;
    }
    setEditingPlaylist(playlist:Playlist) {
        this.editingPlaylist = playlist;
    }

    getPlaylists() {
        return this.playlists.slice();
    }

    add(playlistName: string){
        let playlist = this.playlistFactoryService.create();
        playlist.setName(playlistName);
        this.editingPlaylist = playlist;
        this.playlists.push(playlist);
        this.save();
        this.playlistsChange.next(this.playlists.slice());
    }

    public save(): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log("Playlists saved");
            // if (this.playlists.length == 0) {
            //     this.storage.remove('playlists')
            //         .catch(()=>{
            //             alert('Impossible de sauvegarder les playlists')
            //         });
            // } else {
            this.storage.set('playlists', this.saveToString())
                .then(() => {
                    resolve();
                })
                .catch(() => {
                    reject('Impossible de sauvegarder les playlists')
                });
            // }
        })
    };

    public load(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.storage.get('playlists')
                .then((jsonStr) => {
                    if (jsonStr != null) {
                        console.log("Playlists loaded", jsonStr);
                        this.loadFromString(jsonStr);
                        resolve();
                        this.playlistsChange.next(this.playlists.slice());
                    }
                })
                .catch(
                    () => {
                        reject('Impossible de charger les playlists');
                    });

            this.editingPlaylist = this.playlists[0];
        })
    }

    private saveToString(): string {
        let array = [];
        this.playlists.forEach((playlist) => {
            array.push(playlist.saveToPlaylistInterface());
        });
        return JSON.stringify(array);
    }

    private loadFromString(jsonStr: string){
        let array: PlaylistInterface[] = JSON.parse(jsonStr);
        this.playlists = [];
        array.forEach((playlistInterface) => {
            let playlist = this.playlistFactoryService.create();
            playlist.loadFromPlaylistInterface(playlistInterface);
            this.playlists.push(playlist);
        })
    }


}



