import {Injectable} from "@angular/core";
import {Platform} from "@ionic/angular";

@Injectable({
    providedIn: 'root',
})
export class AssetService {

    constructor (private platform: Platform ) {

    }

    getWavePath(asset: string){
        let rootDir = "";

        if (this.platform.is('android')) {
            rootDir = '/android_asset/www/';
        }

        rootDir += 'assets/sound/';

        // this.filePlayer.play(rootDir + 'assets/sound/Alarme.wav').then(()=>{ alert("done"); });
        return rootDir + asset;
    }
}