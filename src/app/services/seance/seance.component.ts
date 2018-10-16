import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {CountDownComponent} from "./countdown/countDown.component";
import {MediaPlayerService} from "../music/mediaplayer/mediaPlayer.service";
import {AlarmService, AlarmType} from "./alarm/alarm.service";
import {AssetService} from "../files/asset.service";
import {PlaylistsService} from "../music/playlist/playlists.service";

@Component({
    selector: 'seance-component',
    templateUrl: 'seance.component.html',
})

export class SeanceComponent implements OnInit, OnDestroy {
    // @ViewChild('CountDownComponent') countdown: CountDownComponent;
    @ViewChild(CountDownComponent) countdown: CountDownComponent;

    // private seance: Seance;

    constructor(private alarm: AlarmService, private asset: AssetService, private mediaPlayer: MediaPlayerService, private playlistsService: PlaylistsService){
    }

    ngOnInit() {
        let playlist = this.playlistsService.getPlaylists()[0];
        this.mediaPlayer.setPlaylist(playlist);
        this.countdown.initCountDown(10);
    }

    ngOnDestroy() {
    }

    btnTimerStart(){
        this.mediaPlayer.play();
        this.countdown.start();
    }

    btnTimerStop(){
        this.countdown.stop();
        this.countdown.initCountDown(10);
        this.mediaPlayer.stop();
    }

    btnTimerPause(){
        this.countdown.pause();
        this.mediaPlayer.pause();
    }

    btnAlarm(){
        // this.filePlayer.play(rootDir + 'assets/sound/Alarme.wav').then(()=>{ alert("done"); });
        this.alarm.trigger({type:AlarmType.WAVE, path: this.asset.getWavePath('Alarme.wav')});
        this.alarm.trigger({type:AlarmType.VOCAL, msg: 'Course lente.'});
        this.alarm.trigger({type:AlarmType.VOCAL, msg: '1 minute.'});
    }

/*    btnPlay(){
        this.mediaPlayerService.play();
    }
    btnStop(){
        this.mediaPlayerService.stop();
    }
    btnFadeOut(){
        this.mediaPlayerService.fadeOut();
    }
    btnFadeIn(){
        this.mediaPlayerService.fadeIn();
    }
    btnPause(){
        this.mediaPlayerService.pause();
    }
*/
}
