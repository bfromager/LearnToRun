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

        // fakePlaylist.getList().push(this.asset.getWavePath('course lente.wav'));
        fakePlaylist.getList().push(this.asset.getWavePath('1 minute.wav'));
        fakePlaylist.getList().push(this.asset.getWavePath('2 minutes.wav'));
        fakePlaylist.getList().push(this.asset.getWavePath('not a file'));
        fakePlaylist.getList().push(this.asset.getWavePath('not a file'));
        fakePlaylist.getList().push(this.asset.getWavePath('not a file'));
        fakePlaylist.getList().push(this.asset.getWavePath('3 minutes.wav'));
        fakePlaylist.getList().push(this.asset.getWavePath('4 minutes.wav'));
        fakePlaylist.getList().push(this.asset.getWavePath('not a file'));
        // fakePlaylist.getList().push(this.asset.getWavePath('5 minutes.wav'));
        // fakePlaylist.getList().push(this.asset.getWavePath('6 minutes.wav'));
        // fakePlaylist.getList().push(this.asset.getWavePath('7 minutes.wav'));
        // fakePlaylist.getList().push(this.asset.getWavePath('8 minutes.wav'));
        fakePlaylist.getList().push(this.asset.getWavePath('not a file'));
        fakePlaylist.getList().push(this.asset.getWavePath('not a file'));

        this.playlists.push(fakePlaylist);

        this.editingPlaylist = this.playlists[0];
    }
}
