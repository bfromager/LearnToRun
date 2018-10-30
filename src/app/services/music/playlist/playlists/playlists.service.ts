import {Injectable} from "@angular/core";
import {Playlist, PlaylistFactoryService, PlaylistInterface} from "../playlist";
import {Storage} from "@ionic/storage";

@Injectable({
    providedIn: 'root',
})
export class PlaylistsService {
    protected playlists : Playlist[] = [];
    protected editingPlaylist: Playlist = null;

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
        return this.playlists;
    }

    save() {
        // if (this.playlists.length == 0) {
        //     this.storage.remove('playlists')
        //         .catch(()=>{
        //             alert('Impossible de sauvegarder les playlists')
        //         });
        // } else {
        this.storage.set('playlists', this.saveToString())
            .catch(()=>{
                alert('Impossible de sauvegarder les playlists')
            });
        // }
    };

    load() {
        this.storage.get('playlists')
            .then ((jsonStr)=>{
                if (jsonStr != null) {
                    alert("Load OK : " + jsonStr );
                    this.loadFromString(jsonStr);
                }
            })
            .catch(
                ()=>{
                    alert('Impossible de charger les playlists')
                });

        this.editingPlaylist = this.playlists[0];
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



