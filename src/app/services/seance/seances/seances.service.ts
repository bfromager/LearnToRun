import {Injectable} from "@angular/core";
import {Platform} from "@ionic/angular";
import {Seance, SeanceFactoryService} from "../seance";
import {AssetService} from "../../files/asset.service";
import {Storage} from "@ionic/storage";
import {Bloc, SeanceInterface} from '../seance.interface';
import {Subject} from 'rxjs/index';


@Injectable({
    providedIn: 'root',
})

export class SeancesService {
    private seances : Seance[] = [];
    private editingSeance: Seance = null;
    public seancesChange: Subject<Seance[]> = new Subject<Seance[]>();


    constructor(private seanceFactoryService: SeanceFactoryService, private storage: Storage, private asset: AssetService) {
        this.load();
    }

    getEditingSeance(): Seance {
        return this.editingSeance;
    }
    setEditingSeance(Seance:Seance) {
        this.editingSeance = Seance;
    }

    getSeances() {
        return this.seances.slice();
    }

    private saveToString(): string {
        let array = [];
        this.seances.forEach((seance) => {
            array.push(seance.saveToInterface());
        });
        return JSON.stringify(array);
    }

    private loadFromString(jsonStr: string){
        let array: SeanceInterface[] = JSON.parse(jsonStr);
        this.seances = [];
        array.forEach((seanceInterface) => {
            let seance = this.seanceFactoryService.create();
            seance.loadFromInterface(seanceInterface);
            this.seances.push(seance);
        })
    }

    add(seanceName: string){
        let seance = this.seanceFactoryService.create();
        seance.setName(seanceName);
        this.editingSeance = seance;
        this.seances.push(seance);
        this.save();
        this.seancesChange.next(this.seances.slice());
    }

    public save(): Promise<any> {
        return new Promise((resolve, reject) => {
            // if (this.playlists.length == 0) {
            //     this.storage.remove('playlists')
            //         .catch(()=>{
            //             alert('Impossible de sauvegarder les playlists')
            //         });
            // } else {
            this.storage.set('seances', this.saveToString())
                .then(() => {
                    console.log("Seance saved");
                    resolve();
                })
                .catch(() => {
                    reject('Impossible de sauvegarder les seances')
                });
            // }
        })
    };

    // public load() {
    public load(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.storage.get('seances')
                .then((jsonStr) => {
                    if (jsonStr != null) {
                        this.loadFromString(jsonStr);
                        console.log("Seances loaded", jsonStr);
                        resolve();
                        this.seancesChange.next(this.seances.slice());
                    }
                })
                .catch(
                    () => {
                        reject('Impossible de charger les seances');
                    });

            this.editingSeance = this.seances[0];
        })

/*        let fakeSeance = this.seanceFactoryService.create();

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
*/
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
