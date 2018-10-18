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

        this.fakeSeance.getFractions().push({timeInSecond:10, waveBegin: this.asset.getWavePath("Alarme.wave"), vocalBegin: "Course lente. 10 secondes"});
        this.fakeSeance.getFractions().push({timeInSecond:5, waveBegin: this.asset.getWavePath("Alarme.wave"), vocalBegin: "Marche. 5 secondes"});
        this.fakeSeance.getFractions().push({timeInSecond:10, waveBegin: this.asset.getWavePath("Alarme.wave"), vocalBegin: "Course lente. 15 secondes"});
        this.fakeSeance.getFractions().push({timeInSecond:5, waveBegin: this.asset.getWavePath("Alarme.wave"), vocalBegin: "Marche. 5 secondes"});

        this.seances.push(this.fakeSeance);
    }

    getSeances () {
        return this.seances.slice();
    }
}

