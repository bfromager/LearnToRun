import {PlaylistFactoryService} from "../playlist";
import {PlaylistsServiceBase} from "./playlists.model";
import {Storage} from "@ionic/storage";

export class PlaylistsServiceCordova extends PlaylistsServiceBase{
    constructor(protected playlistFactoryService: PlaylistFactoryService, private storage: Storage) {
        super(playlistFactoryService);
        this.load();
    }
    save() {
        alert("save");
        this.storage.set('playlists', this.saveToString())
            .catch(()=>{
                alert('Impossible de sauvegarder les playlists')
            });
    };
    load() {
        // let fakePlaylist = this.playlistFactoryService.create();
        // fakePlaylist.setName("playlist cordova 1");
        // //
        // // this.playlists.push(fakePlaylist);
        // //
        // // fakePlaylist = this.playlistFactoryService.create();
        // // fakePlaylist.setName("playlist cordova 2");
        // //
        // // fakePlaylist.getList().push({name:"1 minute", path:this.asset.getWavePath('1 minute.wav')});
        // // fakePlaylist.getList().push({name:"2 minutes", path:this.asset.getWavePath('2 minutes.wav')});
        // // fakePlaylist.getList().push({name:"not a file", path:this.asset.getWavePath('not a file')});
        // // fakePlaylist.getList().push({name:"3 minutes", path:this.asset.getWavePath('3 minutes.wav')});
        // // fakePlaylist.getList().push({name:"4 minutes", path:this.asset.getWavePath('4 minutes.wav')});
        // //
        // this.playlists.push(fakePlaylist);

        this.storage.get('playlists')
            .then ((jsonStr)=>{
                if (jsonStr != null) {
                    alert("Load OK : " + jsonStr );
                    this.loadFromString(jsonStr);
                }
            })
            .catch(
                ()=>{
                    alert('Impossible de charger les playlists')
                });

        this.editingPlaylist = this.playlists[0];
    }
}
