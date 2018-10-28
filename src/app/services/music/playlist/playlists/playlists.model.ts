import {Playlist} from "../playlist";

export class PlaylistsServiceBase{
    protected playlists : Playlist[] = [];
    protected editingPlaylist: Playlist = null;

    constructor() {
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
}
