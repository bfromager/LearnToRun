import {Playlist, PlaylistFactoryService} from "../playlist";
import {AssetService} from "../../../files/asset.service";
import {PlaylistsServiceBase} from "./playlists.model";

export class PlaylistsServiceFake extends PlaylistsServiceBase{

    constructor(private asset: AssetService, private playlistFactoryService: PlaylistFactoryService) {
        super();

        let fakePlaylist = this.playlistFactoryService.create();
        fakePlaylist.setName("fake playlist 1");

        // fakePlaylist.getList().push({name:"", path:this.asset.getWavePath('course lente.wav')});
        fakePlaylist.getList().push({name:"1 minute", path:this.asset.getWavePath('1 minute.wav')});
        fakePlaylist.getList().push({name:"2 minutes", path:this.asset.getWavePath('2 minutes.wav')});
        fakePlaylist.getList().push({name:"not a file", path:this.asset.getWavePath('not a file')});
        fakePlaylist.getList().push({name:"3 minutes", path:this.asset.getWavePath('3 minutes.wav')});
        fakePlaylist.getList().push({name:"4 minutes", path:this.asset.getWavePath('4 minutes.wav')});

        this.playlists.push(fakePlaylist);

        fakePlaylist = this.playlistFactoryService.create();
        fakePlaylist.setName("fake playlist 2");

        // fakePlaylist.getList().push({name:"PL2 File 1", path:this.asset.getWavePath('PL2 File 1.wav')});
        // fakePlaylist.getList().push({name:"PL2 File 2", path:this.asset.getWavePath('PL2 File 2.wav')});
        // fakePlaylist.getList().push({name:"PL2 File 3", path:this.asset.getWavePath('PL2 File 3.wav')});
        // fakePlaylist.getList().push({name:"PL2 File 4", path:this.asset.getWavePath('PL2 File 4.wav')});

        this.playlists.push(fakePlaylist);

        this.editingPlaylist = this.playlists[1];
    }
}
