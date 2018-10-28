import {Injectable} from "@angular/core";
import {Playlist, PlaylistFactoryService} from "../playlist";
import {Platform} from "@ionic/angular";
import {PlaylistsServiceFake} from "./playlists.fake";
import {PlaylistsServiceCordova} from "./playlists.cordova";
import {Storage} from "@ionic/storage";

// export abstract class PlaylistsBaseService {
//     protected playlists : Playlist[] = [];
//
//     constructor() {
//     }
//
//     getPlaylists () {
//         return this.playlists;
//     }
// }

@Injectable({
    providedIn: 'root',
    useFactory: PlaylistsServiceFactory,
    deps: [Platform, PlaylistFactoryService],
})
export abstract class PlaylistsService {

    abstract getEditingPlaylist(): Playlist;
    abstract setEditingPlaylist(playlist:Playlist);

    abstract getPlaylists ();
    abstract load ();
    abstract save ();
    abstract saveToString(): string;
    abstract loadFromString();
}

function PlaylistsServiceFactory (platform: Platform, playlistFactoryService: PlaylistFactoryService, storage: Storage) {
    if (platform.is('cordova')) {
        console.log("PlaylistsServiceFactory", "cordova");
        return new PlaylistsServiceCordova(playlistFactoryService, storage);
    }
    else {
        console.log("PlaylistsServiceFactory","not cordova");
        return new PlaylistsServiceFake(playlistFactoryService);
    }
}


