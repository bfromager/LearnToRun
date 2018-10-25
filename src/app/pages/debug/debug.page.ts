import { Component } from '@angular/core';
import {VocalService} from "../../services/seance/alarm/vocal/vocal.service";
import {WaveService} from "../../services/seance/alarm/wave/wave.service";
import {AssetService} from "../../services/files/asset.service";
import {AlarmService, AlarmType} from "../../services/seance/alarm/alarm.service";

// todo : theming
// https://angularfirebase.com/lessons/css-variables-in-ionic-4/
// https://www.youtube.com/watch?v=CW7kvEJlNys

@Component({
    selector: 'app-debug',
    templateUrl: 'debug.page.html',
    styleUrls: ['debug.page.scss'],
})
export class DebugPage {

    constructor(private vocalService: VocalService, private waveService: WaveService, private asset: AssetService, private alarm: AlarmService ) {

    }

    btnTextToSpeech(){
        this.vocalService.speech("Course lente 10 minutes");
    }

    btnWave(){
        this.waveService.play(this.asset.getWavePath('Alarme.wav'));
    }

    btnAlarm(){
        // this.filePlayer.play(rootDir + 'assets/sound/Alarme.wav').then(()=>{ alert("done"); });
        this.alarm.trigger({type:AlarmType.WAVE, path: this.asset.getWavePath('Alarme.wav')});
        this.alarm.trigger({type:AlarmType.VOCAL, msg: 'Course lente.'});
        this.alarm.trigger({type:AlarmType.VOCAL, msg: '1 minute.'});
    }

}
