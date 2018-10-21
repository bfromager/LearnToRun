import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {CountDownComponent} from "./countdown/countDown.component";
import {MediaPlayerService} from "../music/mediaplayer/mediaPlayer.service";
import {AlarmService, AlarmType} from "./alarm/alarm.service";
import {AssetService} from "../files/asset.service";
import {PlaylistsService} from "../music/playlist/playlists.service";
import {Subscription} from "rxjs/index";
import {Seance} from "./seance";
import {SeancesService} from "./seances.service";

@Component({
    selector: 'seance-component',
    templateUrl: 'seance.component.html',
})

export class SeanceComponent implements OnInit, OnDestroy {
    // @ViewChild('CountDownComponent') countdown: CountDownComponent;
    @ViewChild(CountDownComponent) countdown: CountDownComponent;

    private seance: Seance;
    private countDownSub :Subscription = null;
    paused = false;

    constructor(
        private asset: AssetService
        , private mediaPlayer: MediaPlayerService
        , private alarm: AlarmService
        , private playlists: PlaylistsService
        , private seances: SeancesService
    ){
    }

    ngOnInit() {
        this.seance = this.seances.getSeances()[0];

        // this.seance.getNextFraction()
        //     .then((fraction) => {
        //         alert(fraction.vocalBegin);
        //     });
        // this.seance.getNextFraction()
        //     .then((fraction) => {
        //         alert(fraction.vocalBegin);
        //     });
        // this.seance.getNextFraction()
        //     .then((fraction) => {
        //         alert(fraction.vocalBegin);
        //     });


        let playlist = this.playlists.getPlaylists()[0];
        this.mediaPlayer.setPlaylist(playlist);

    }

    private initCountDown(){
        this.countDownSub = this.countdown.event.subscribe(()=>{this.onCountDownEvent();});
        this.countdown.initCountDown(10);
    }
    private startCountDown(){
        this.paused = false;
        this.countdown.start();
    }
    private stopCountDown(){
        this.countdown.stop();
        if (this.countDownSub != null) {
            this.countDownSub.unsubscribe();
            this.countDownSub = null;
        }
    }


    private startSeance(){
        this.mediaPlayer.play();

        this.initCountDown();
        this.startCountDown();
    }
    private stopSeance(){
        this.stopCountDown();
        this.mediaPlayer.stop();
    }


    ngOnDestroy() {
        this.stopSeance();
    }

    onCountDownEvent(){
        // alert("stop");
    }

    btnTimerStart(){
        this.startSeance();
    }

    btnTimerStop(){
        this.stopSeance();
    }

    btnTimerPause(){
        this.paused = !this.paused;

        if (this.paused) {
            this.countdown.pause();
            this.mediaPlayer.pause();
        } else {
            this.countdown.start();
            this.mediaPlayer.play();
        }
    }

    btnAlarm(){
        // this.filePlayer.play(rootDir + 'assets/sound/Alarme.wav').then(()=>{ alert("done"); });
        this.alarm.trigger({type:AlarmType.WAVE, path: this.asset.getWavePath('Alarme.wav')});
        this.alarm.trigger({type:AlarmType.VOCAL, msg: 'Course lente.'});
        this.alarm.trigger({type:AlarmType.VOCAL, msg: '1 minute.'});
    }

}
