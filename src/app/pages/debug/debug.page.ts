import { Component } from '@angular/core';
import {VocalService} from "../../services/seance/alarm/vocal/vocal.service";
import {WaveService} from "../../services/seance/alarm/wave/wave.service";
import {AssetService} from "../../services/files/asset.service";
import {AlarmService, AlarmType} from "../../services/seance/alarm/alarm.service";
import {FractionAlarmService} from "../../services/seance/alarm/fractionAlarm.service";

// todo : theming
// https://angularfirebase.com/lessons/css-variables-in-ionic-4/
// https://www.youtube.com/watch?v=CW7kvEJlNys

@Component({
    selector: 'app-debug',
    templateUrl: 'debug.page.html',
    styleUrls: ['debug.page.scss'],
})
export class DebugPage {

    constructor(
        private vocalService: VocalService
        , private waveService: WaveService
        , private asset: AssetService
        , private alarm: AlarmService
        , private fractionAlarm: FractionAlarmService ) {

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


    btnSecondsAsText(){
        console.log(10, this.fractionAlarm.getSecondsAsText(10));
        console.log(60, this.fractionAlarm.getSecondsAsText(60));
        console.log(90, this.fractionAlarm.getSecondsAsText(90));
        console.log(135, this.fractionAlarm.getSecondsAsText(135));
        console.log(600, this.fractionAlarm.getSecondsAsText(600));
        console.log(3600, this.fractionAlarm.getSecondsAsText(3600));
        console.log(3610, this.fractionAlarm.getSecondsAsText(3610));
        console.log(4200, this.fractionAlarm.getSecondsAsText(4200));
        console.log(3690, this.fractionAlarm.getSecondsAsText(3690));
        console.log(7290, this.fractionAlarm.getSecondsAsText(7290));
        console.log(9000, this.fractionAlarm.getSecondsAsText(9000));
        console.log(9030, this.fractionAlarm.getSecondsAsText(9030));
    }

}
