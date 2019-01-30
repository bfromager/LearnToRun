import {Injectable} from "@angular/core";
import {Platform} from "@ionic/angular";
import {Seance, SeanceFactoryService} from "../seance";
import {AssetService} from "../../files/asset.service";
import {Storage} from "@ionic/storage";


@Injectable({
    providedIn: 'root',
})

export class SeancesService {
    private seances : Seance[] = [];
    // private editingPlaylist: Playlist = null;
    // public playlistsChange: Subject<Playlist[]> = new Subject<Playlist[]>();


    constructor(private seanceFactoryService: SeanceFactoryService, private storage: Storage, private asset: AssetService) {
        this.load();
    }

    // getEditingPlaylist(): Playlist {
    //     return this.editingPlaylist;
    // }
    // setEditingPlaylist(playlist:Playlist) {
    //     this.editingPlaylist = playlist;
    // }

    getSeances() {
        return this.seances.slice();
    }

    // private saveToString(): string {
    //     let array = [];
    //     this.playlists.forEach((playlist) => {
    //         array.push(playlist.saveToPlaylistInterface());
    //     });
    //     return JSON.stringify(array);
    // }
    //
    // private loadFromString(jsonStr: string){
    //     let array: PlaylistInterface[] = JSON.parse(jsonStr);
    //     this.playlists = [];
    //     array.forEach((playlistInterface) => {
    //         let playlist = this.playlistFactoryService.create();
    //         playlist.loadFromPlaylistInterface(playlistInterface);
    //         this.playlists.push(playlist);
    //     })
    // }

    // add(playlistName: string){
    //     let playlist = this.playlistFactoryService.create();
    //     playlist.setName(playlistName);
    //     this.editingPlaylist = playlist;
    //     this.playlists.push(playlist);
    //     this.save();
    //     this.playlistsChange.next(this.playlists.slice());
    // }

    // public save(): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         console.log("Playlists saved");
    //         // if (this.playlists.length == 0) {
    //         //     this.storage.remove('playlists')
    //         //         .catch(()=>{
    //         //             alert('Impossible de sauvegarder les playlists')
    //         //         });
    //         // } else {
    //         this.storage.set('playlists', this.saveToString())
    //             .then(() => {
    //                 resolve();
    //             })
    //             .catch(() => {
    //                 reject('Impossible de sauvegarder les playlists')
    //             });
    //         // }
    //     })
    // };

    // public load(): Promise<any> {
    public load() {
        // return new Promise((resolve, reject) => {
        //     this.storage.get('seances')
        //         .then((jsonStr) => {
        //             if (jsonStr != null) {
        //                 console.log("Seances loaded", jsonStr);
        //                 this.loadFromString(jsonStr);
        //                 resolve();
        //                 // this.playlistsChange.next(this.playlists.slice());
        //             }
        //         })
        //         .catch(
        //             () => {
        //                 reject('Impossible de charger les seances');
        //             });
        //
        //     // this.editingPlaylist = this.playlists[0];
        // })
        let fakeSeance = this.seanceFactoryService.create();

        fakeSeance.addFraction({type: "Fraction", timeInSecond:5, libelle: "Course lente", waveBegin: this.asset.getWavePath("Alarme.wav")},fakeSeance.getRootBloc());
        fakeSeance.addFraction({type: "Fraction", timeInSecond:2, libelle: "Marche", waveBegin: this.asset.getWavePath("Alarme.wav")},fakeSeance.getRootBloc());

        let bloc = fakeSeance.addBloc(fakeSeance.getRootBloc());
        bloc.repeat = 3;

        fakeSeance.addFraction({type: "Fraction", timeInSecond:3, libelle: "Repeat before", waveBegin: this.asset.getWavePath("Alarme.wav")}, bloc);

        let subBloc = fakeSeance.addBloc(bloc);
        subBloc.repeat = 2;
        fakeSeance.addFraction({type: "Fraction", timeInSecond:5, libelle: "Sub Repeat", waveBegin: this.asset.getWavePath("Alarme.wav")}, subBloc);

        fakeSeance.addFraction({type: "Fraction", timeInSecond:3, libelle: "Repeat after", waveBegin: this.asset.getWavePath("Alarme.wav")}, bloc);

        this.seances.push(fakeSeance);
    }


}

/*@Injectable({
    providedIn: 'root',
    useFactory: SeancesServiceFactory,
    deps: [Platform, AssetService, SeanceFactoryService],
})
export class SeancesService {

    getSeances () {
        return [];
    }
}

function SeancesServiceFactory (platform: Platform, assetService: AssetService, seanceFactoryService: SeanceFactoryService) {
    return new SeancesServiceFake(assetService, seanceFactoryService);
}

class SeancesServiceFake{
    private fakeSeance: Seance;
    private seances : Seance[] = [];

    constructor(private asset: AssetService, private seanceFactoryService: SeanceFactoryService) {
        this.fakeSeance = this.seanceFactoryService.create();

        this.fakeSeance.pushFraction({timeInSecond:10, libelle: "Course lente", waveBegin: this.asset.getWavePath("Alarme.wav")});
        this.fakeSeance.pushFraction({timeInSecond:5, libelle: "Marche", waveBegin: this.asset.getWavePath("Alarme.wav")});
        this.fakeSeance.pushFraction({timeInSecond:10, libelle: "Course lente", waveBegin: this.asset.getWavePath("Alarme.wav")});
        this.fakeSeance.pushFraction({timeInSecond:5, libelle: "Marche", waveBegin: this.asset.getWavePath("Alarme.wav")});

        this.seances.push(this.fakeSeance);
    }

    getSeances () {
        return this.seances.slice();
    }
}
*/
