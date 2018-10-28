import {Playlist, PlaylistFactoryService, PlaylistInterface} from "../playlist";
import {OnDestroy, OnInit} from "@angular/core";

export abstract class PlaylistsServiceBase{
    protected playlists : Playlist[] = [];
    protected editingPlaylist: Playlist = null;

    abstract save();
    abstract load();

    constructor(protected playlistFactoryService: PlaylistFactoryService) {
        // this.load();
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

    saveToString(): string {
        let array = [];
        this.playlists.forEach((playlist) => {
            array.push(playlist.saveToPlaylistInterface());
        });
        return JSON.stringify(array);
    }

    loadFromString(jsonStr: string){
        let array: PlaylistInterface[] = JSON.parse(jsonStr);
        this.playlists = [];
        array.forEach((playlistInterface) => {
            let playlist = this.playlistFactoryService.create();
            playlist.loadFromPlaylistInterface(playlistInterface);
            this.playlists.push(playlist);
        })
    }

    // toString(): string {
    //     let playlistInterface: PlaylistInterface = {
    //         name: this.name,
    //         list: this.list,
    //     }
    //     // console.log(playlistInterface.name,playlistInterface.list);
    //     return JSON.stringify (playlistInterface);
    // }
    // loadFromString(jsonString: string) {
    //     let playlistInterface: PlaylistInterface = <PlaylistInterface>JSON.parse(jsonString);
    //     // console.log(playlistInterface.name,playlistInterface.list);
    //     this.name = playlistInterface.name;
    //     this.list = playlistInterface.list;
    // }

}
