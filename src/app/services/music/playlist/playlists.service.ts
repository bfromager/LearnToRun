// https://stackoverflow.com/questions/41432388/how-to-inject-service-into-class-not-component
// https://stackoverflow.com/questions/40536409/getting-dependency-from-injector-manually-inside-a-directive/40537194#40537194
// https://stackoverflow.com/questions/42396804/how-to-write-a-service-constructor-that-requires-parameters-in-angular-2
// https://offering.solutions/blog/articles/2018/08/17/using-useclass-usefactory-usevalue-useexisting-with-treeshakable-providers-in-angular/

import {Injectable} from "@angular/core";
import {Playlist, PlaylistFactoryService} from "./playlist";
import {AssetService} from "../../files/asset.service";
import {Platform} from "@ionic/angular";

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
    deps: [Platform, AssetService, PlaylistFactoryService],
})
export class PlaylistsService {

    getPlaylists () {
        return [];
    }
}

function PlaylistsServiceFactory (platform: Platform, assetService: AssetService, playlistFactoryService: PlaylistFactoryService) {
    return new PlaylistsServiceFake(assetService, playlistFactoryService);
}

class PlaylistsServiceFake{
    private fakePlaylist: Playlist;
    private playlists : Playlist[] = [];

    constructor(private asset: AssetService, private playlistFactoryService: PlaylistFactoryService) {
        this.fakePlaylist = this.playlistFactoryService.create();

        // this.fakePlaylist.getList().push(this.asset.getWavePath('course lente.wav'));
        this.fakePlaylist.getList().push(this.asset.getWavePath('Dimmu.mp3'));
        this.fakePlaylist.getList().push(this.asset.getWavePath('1 minute.wav'));
        this.fakePlaylist.getList().push(this.asset.getWavePath('2 minutes.wav'));
        this.fakePlaylist.getList().push(this.asset.getWavePath('not a file'));
        this.fakePlaylist.getList().push(this.asset.getWavePath('not a file'));
        this.fakePlaylist.getList().push(this.asset.getWavePath('not a file'));
        this.fakePlaylist.getList().push(this.asset.getWavePath('3 minutes.wav'));
        this.fakePlaylist.getList().push(this.asset.getWavePath('4 minutes.wav'));
        this.fakePlaylist.getList().push(this.asset.getWavePath('not a file'));
        // this.fakePlaylist.getList().push(this.asset.getWavePath('5 minutes.wav'));
        // this.fakePlaylist.getList().push(this.asset.getWavePath('6 minutes.wav'));
        // this.fakePlaylist.getList().push(this.asset.getWavePath('7 minutes.wav'));
        // this.fakePlaylist.getList().push(this.asset.getWavePath('8 minutes.wav'));
        this.fakePlaylist.getList().push(this.asset.getWavePath('not a file'));
        this.fakePlaylist.getList().push(this.asset.getWavePath('not a file'));

        this.playlists.push(this.fakePlaylist);
    }

    getPlaylists () {
        return this.playlists.slice();
    }
}

