import {Playlist, PlaylistFactoryService} from "../playlist";
import {AssetService} from "../../../files/asset.service";

export class PlaylistsServiceFake{
    private fakePlaylist: Playlist;
    private playlists : Playlist[] = [];

    constructor(private asset: AssetService, private playlistFactoryService: PlaylistFactoryService) {
        this.fakePlaylist = this.playlistFactoryService.create();
        this.fakePlaylist.setName("fake playlist");

        // this.fakePlaylist.getList().push(this.asset.getWavePath('course lente.wav'));
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
