import {PlaylistFactoryService} from "../playlist";
import {PlaylistsServiceBase} from "./playlists.model";
import {Storage} from "@ionic/storage";

export class PlaylistsServiceCordova extends PlaylistsServiceBase{
    constructor(protected playlistFactoryService: PlaylistFactoryService, private storage: Storage) {
        super(playlistFactoryService);
        this.load();
    }
    save() {
        // this.storage.set('playlists', this.saveToString())
        //     .then(()=>{
        //         alert("save OK");
        //     })
        //     .catch((error)=>{
        //         alert("save error : " + error);
        //     });
    };
    load() {
        // alert("load");
        // this.storage.get('playlists')
        //     .then( (jsonStr) =>
        //         alert(jsonStr)
        //     )
        // ;

        // this.storage.get('playlists')
        //     .then((jsonStr)=>{
        //         alert("save OK : " + jsonStr );
        //     })
        //     .catch((error)=>{
        //         alert("save error : " + error);
        //     });

        let fakePlaylist = this.playlistFactoryService.create();
        fakePlaylist.setName("playlist cordova 1");
        //
        // this.playlists.push(fakePlaylist);
        //
        // fakePlaylist = this.playlistFactoryService.create();
        // fakePlaylist.setName("playlist cordova 2");
        //
        // fakePlaylist.getList().push({name:"1 minute", path:this.asset.getWavePath('1 minute.wav')});
        // fakePlaylist.getList().push({name:"2 minutes", path:this.asset.getWavePath('2 minutes.wav')});
        // fakePlaylist.getList().push({name:"not a file", path:this.asset.getWavePath('not a file')});
        // fakePlaylist.getList().push({name:"3 minutes", path:this.asset.getWavePath('3 minutes.wav')});
        // fakePlaylist.getList().push({name:"4 minutes", path:this.asset.getWavePath('4 minutes.wav')});
        //
        this.playlists.push(fakePlaylist);

        this.editingPlaylist = this.playlists[0];
    }
}
