import {PlaylistFactoryService} from "../playlist";
import {PlaylistsServiceBase} from "./playlists.model";

export class PlaylistsServiceFake extends PlaylistsServiceBase{

    constructor(protected playlistFactoryService: PlaylistFactoryService) {
        super(playlistFactoryService);
        this.load();
    }

    save() {

    };
    load() {
        let jsonStr = '[' +
            '{"name":"fake LOADED playlist 1","list":[' +
                '{"name":"1 minute LOADED ","path":"assets/sound/1 minute.wav"},' +
                '{"name":"2 minutes LOADED ","path":"assets/sound/2 minutes.wav"},' +
                '{"name":"not a file","path":"assets/sound/not a file"},' +
                '{"name":"3 minutes LOADED ","path":"assets/sound/3 minutes.wav"},' +
                '{"name":"4 minutes LOADED ","path":"assets/sound/4 minutes.wav"}' +
            ']},' +
            '{"name":"fake LOADED playlist 2","list":[' +
                '{"name":"PL2 LOADED File 1","path":"assets/sound/PL2 File 1.wav"},' +
                '{"name":"PL2 LOADED File 2","path":"assets/sound/PL2 File 2.wav"},' +
                '{"name":"PL2 LOADED File 3","path":"assets/sound/PL2 File 3.wav"},' +
                '{"name":"PL2 LOADED File 4","path":"assets/sound/PL2 File 4.wav"}]' +
            '}]';
        this.loadFromString(jsonStr);

        // let fakePlaylist = this.playlistFactoryService.create();
        // fakePlaylist.setName("fake playlist 1");
        //
        //
        // // fakePlaylist.getList().push({name:"", path:this.asset.getWavePath('course lente.wav')});
        // fakePlaylist.getList().push({name:"1 minute", path:this.asset.getWavePath('1 minute.wav')});
        // fakePlaylist.getList().push({name:"2 minutes", path:this.asset.getWavePath('2 minutes.wav')});
        // fakePlaylist.getList().push({name:"not a file", path:this.asset.getWavePath('not a file')});
        // fakePlaylist.getList().push({name:"3 minutes", path:this.asset.getWavePath('3 minutes.wav')});
        // fakePlaylist.getList().push({name:"4 minutes", path:this.asset.getWavePath('4 minutes.wav')});
        //
        // // let jsonStr = '{' +
        // //     '"name":"fake playlist LOADED",' +
        // //     '"list":[' +
        // //     '{"name":"1 minute LOADED","path":"assets/sound/1 minute LOADED.wav"},' +
        // //     '{"name":"2 minutes LOADED","path":"assets/sound/2 minutes LOADED.wav"},' +
        // //     '{"name":"not a file","path":"assets/sound/not a file"},' +
        // //     '{"name":"3 minutes LOADED","path":"assets/sound/3 minutes LOADED.wav"},' +
        // //     '{"name":"4 minutes LOADED","path":"assets/sound/4 minutes LOADED.wav"}' +
        // //     ']}';
        // // fakePlaylist.loadFromString(jsonStr);
        //
        // this.playlists.push(fakePlaylist);
        //
        // fakePlaylist = this.playlistFactoryService.create();
        // fakePlaylist.setName("fake playlist 2");
        //
        // fakePlaylist.getList().push({name:"PL2 File 1", path:this.asset.getWavePath('PL2 File 1.wav')});
        // fakePlaylist.getList().push({name:"PL2 File 2", path:this.asset.getWavePath('PL2 File 2.wav')});
        // fakePlaylist.getList().push({name:"PL2 File 3", path:this.asset.getWavePath('PL2 File 3.wav')});
        // fakePlaylist.getList().push({name:"PL2 File 4", path:this.asset.getWavePath('PL2 File 4.wav')});
        //
        // this.playlists.push(fakePlaylist);

        this.editingPlaylist = this.playlists[0];
    };

}
