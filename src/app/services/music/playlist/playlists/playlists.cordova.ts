import {Playlist, PlaylistFactoryService} from "../playlist";
import {AssetService} from "../../../files/asset.service";
import {PlaylistsServiceBase} from "./playlists.model";

export class PlaylistsServiceCordova extends PlaylistsServiceBase{
    constructor(private asset: AssetService, private playlistFactoryService: PlaylistFactoryService) {
        super();

        let fakePlaylist = this.playlistFactoryService.create();
        fakePlaylist.setName("playlist cordova 1");

        this.playlists.push(fakePlaylist);

        fakePlaylist = this.playlistFactoryService.create();
        fakePlaylist.setName("playlist cordova 2");

        fakePlaylist.getList().push({name:"1 minute", path:this.asset.getWavePath('1 minute.wav')});
        fakePlaylist.getList().push({name:"2 minutes", path:this.asset.getWavePath('2 minutes.wav')});
        fakePlaylist.getList().push({name:"not a file", path:this.asset.getWavePath('not a file')});
        fakePlaylist.getList().push({name:"3 minutes", path:this.asset.getWavePath('3 minutes.wav')});
        fakePlaylist.getList().push({name:"4 minutes", path:this.asset.getWavePath('4 minutes.wav')});

        this.playlists.push(fakePlaylist);

        this.editingPlaylist = this.playlists[0];
    }
}
