// https://stackoverflow.com/questions/41432388/how-to-inject-service-into-class-not-component
// https://stackoverflow.com/questions/40536409/getting-dependency-from-injector-manually-inside-a-directive/40537194#40537194
// https://stackoverflow.com/questions/42396804/how-to-write-a-service-constructor-that-requires-parameters-in-angular-2
// https://offering.solutions/blog/articles/2018/08/17/using-useclass-usefactory-usevalue-useexisting-with-treeshakable-providers-in-angular/

import {Injectable} from "@angular/core";
import {PlaylistFactoryService} from "../playlist";
import {AssetService} from "../../../files/asset.service";
import {Platform} from "@ionic/angular";
import {PlaylistsServiceFake} from "./playlists.fake";
import {PlaylistsServiceCordova} from "./playlists.cordova";

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
    if (platform.is('cordova')) {
        console.log("PlaylistsServiceFactory", "cordova");
        return new PlaylistsServiceCordova(assetService, playlistFactoryService);
    }
    else {
        console.log("PlaylistsServiceFactory","not cordova");
        return new PlaylistsServiceFake(assetService, playlistFactoryService);
    }
}


