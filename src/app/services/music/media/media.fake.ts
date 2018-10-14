import {MediaBase, MediaStatus} from "./media.model";
import {Ticker} from "../../ticker/ticker";

export class MediaFake extends MediaBase {
    private fakeDelay: Ticker = new Ticker(1000);
    private countDown = 0;

    constructor() {
        super();
        this.fakeDelay.tick.subscribe(()=>{this.onTick();});
    }

    load(file : string) {
        console.log("MediaFake", "load", file);
        this.countDown = 2
    }

    play(){
        console.log("MediaFake", "play");
        this.status.next(MediaStatus.STARTING);
        this.status.next(MediaStatus.RUNNING);
        this.fakeDelay.start();
    }
    pause(){
        console.log("MediaFake", "pause");
        this.fakeDelay.stop();
        this.status.next(MediaStatus.PAUSED);
    }
    stop(){
        console.log("MediaFake", "stop");
        this.fakeDelay.stop();
        this.status.next(MediaStatus.PAUSED);
        this.status.next(MediaStatus.STOPPED);
    }

    protected setVolume() {
        console.log("setVolume", this.currentVolume);
    }

    private onTick() {
        -- this.countDown;
        console.log("countDown", this.countDown);
        if (this.countDown == 0) {
            this.fakeDelay.stop();
            this.status.next(MediaStatus.FINISHED);
        }

    }
}