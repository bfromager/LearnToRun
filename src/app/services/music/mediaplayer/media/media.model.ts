import {Subject, Subscription} from "rxjs/index";
import {Ticker} from "../../../ticker/ticker";
import {OnDestroy} from "@angular/core";


export enum MediaStatus {
    NONE = "NONE",
    STARTING = "STARTING",
    RUNNING = "RUNNING",
    PAUSED = "PAUSED",
    STOPPED = "STOPPED",
    FINISHED = "FINISHED",
}

export abstract class MediaBase  implements OnDestroy{
    protected userStop = true;

    protected maxVolume = 0.2;
    protected minVolume = this.maxVolume / 10;
    protected volumeStep = 20;
    protected fadeDelayMs = 750;
    protected  currentVolume = this.maxVolume;
    private isFadingOut = true;

    private ticker: Ticker = new Ticker(this.fadeDelayMs/this.volumeStep);

    status = new Subject<MediaStatus>();
    private fadeEnd = new Subject();
    private sub: Subscription;
    private tickSub: Subscription;

    abstract load(file : string);
    abstract play();
    abstract pause();
    abstract stop();
    protected abstract setVolume();

    constructor() {
        this.tickSub = this.ticker.tick.subscribe(()=>{this.onFaderTick();});
    }

    ngOnDestroy() {
        this.stop();
        this.tickSub.unsubscribe();
    }

    fadeOut() : Promise<any> {
        return new Promise(resolve => {
            this.sub = this.fadeEnd.subscribe(() => {
                this.sub.unsubscribe();
                resolve(null);
            });
            this.isFadingOut = true;
            this.ticker.start();
        });
    }

    fadeIn() : Promise<any> {
        return new Promise(resolve => {
            this.sub = this.fadeEnd.subscribe(() => {
                this.sub.unsubscribe();
                resolve(null);
            });
            this.isFadingOut = false;
            this.ticker.start();
        });
    }

    private onFaderTick() {
        let step =  (this.maxVolume - this.minVolume) /  this.volumeStep;
        if (this.isFadingOut) {
            if (this.currentVolume <= this.minVolume) {
                this.ticker.stop();
                this.fadeEnd.next();
                return;
            }
            this.currentVolume -= step;
        }
        else {
            if (this.currentVolume >= this.maxVolume) {
                this.ticker.stop();
                this.fadeEnd.next();
                return;
            }
            this.currentVolume += step;
        }
        this.setVolume();
    }

}