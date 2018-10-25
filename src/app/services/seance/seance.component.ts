import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {CountDownComponent} from "./countdown/countDown.component";
import {MediaPlayerService} from "../music/mediaplayer/mediaPlayer.service";
// import {AlarmService, AlarmType} from "./alarm/alarm.service";
// import {AssetService} from "../files/asset.service";
import {PlaylistsService} from "../music/playlist/playlists.service";
import {Subscription} from "rxjs/index";
import {Seance} from "./seance";
import {SeancesService} from "./seances.service";
import {Fraction} from "./fraction.interface";

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
        // private asset: AssetService,
        private mediaPlayer: MediaPlayerService,
        // private alarm: AlarmService,
        private playlists: PlaylistsService,
        private seances: SeancesService
    ){
    }

    ngOnInit() {
        this.seance = this.seances.getSeances()[0];

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

    private startSeance(){
        this.started = true;
        this.mediaPlayer.play();

        this.getNextFraction();
    }
    private stopSeance(){
        this.started = false;
        this.stopCountDown();
        this.mediaPlayer.stop();
    }

    private getNextFraction(){
        this.seance.getNextFraction()
            .then((fraction) => {
                // alert(fraction.timeInSecond);
                this.initCountDown(fraction);
                this.startCountDown();
            })
            .catch(() => {
                this.stopSeance()
            });
    }

    onCountDownEvent(){
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
