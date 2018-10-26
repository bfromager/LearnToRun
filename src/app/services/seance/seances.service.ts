import {Injectable} from "@angular/core";
import {Platform} from "@ionic/angular";
import {Seance, SeanceFactoryService} from "./seance";
import {AssetService} from "../files/asset.service";

@Injectable({
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

