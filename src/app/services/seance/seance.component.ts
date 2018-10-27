import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {CountDownComponent} from "./countdown/countDown.component";
import {MediaPlayerService} from "../music/mediaplayer/mediaPlayer.service";
import {PlaylistsService} from "../music/playlist/playlists/playlists.service";
import {Subscription} from "rxjs/index";
import {Seance} from "./seance";
import {SeancesService} from "./seances.service";
import {Fraction} from "./fraction.interface";
import {FractionAlarmService} from "./alarm/fractionAlarm.service";

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
    started = false;

    constructor(
        private mediaPlayer: MediaPlayerService,
        private alarm: FractionAlarmService,
        private playlists: PlaylistsService,
        private seances: SeancesService
    ){
    }

    ngOnInit() {
        this.seance = this.seances.getSeances()[0];
        this.initSeance();

        let playlist = this.playlists.getPlaylists()[0];
        this.mediaPlayer.setPlaylist(playlist);

        this.countDownSub = this.countdown.event.subscribe(()=>{this.onCountDownEvent();});
    }

    ngOnDestroy() {
        this.stopSeance();
        if (this.countDownSub != null) {
            this.countDownSub.unsubscribe();
            this.countDownSub = null;
        }
    }

    private initCountDown(fraction: Fraction){
        this.countdown.initCountDown(fraction.timeInSecond);
    }
    private startCountDown(){
        this.paused = false;
        this.countdown.start();
    }
    private stopCountDown(){
        this.countdown.stop();
    }

    private initSeance(){
        this.seance.getFirstFraction()
            .then((fraction) => {
                this.initCountDown(fraction);
            })
            .catch(() => {
                this.countdown.initCountDown(0);
            });
    }
    private startSeance(){
        this.started = true;
        this.mediaPlayer.play();

        this.seance.init();
        this.getNextFraction();
    }
    private stopSeance(){
        this.started = false;
        this.stopCountDown();
        this.mediaPlayer.stop();
        this.initSeance();
    }

    private getNextFraction(){
        this.seance.getNextFraction()
            .then((fraction) => {
                this.initCountDown(fraction);
                this.startCountDown();
                this.alarm.beginAlarm(fraction);
            })
            .catch(() => {
                this.stopSeance()
            });
    }

    private onCountDownEvent(){
        this.getNextFraction();
    }

    btnTimerStart(){
        if (!this.started) {
            this.startSeance();
        } else {
            this.startCountDown();
            this.mediaPlayer.play();
        }
    }

    btnTimerStop(){
        this.stopSeance();
    }

    btnTimerPause(){
        this.paused = true;

        this.countdown.pause();
        this.mediaPlayer.pause();
    }

}
