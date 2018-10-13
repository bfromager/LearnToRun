import {interval, Observable, Subject, Subscription} from "rxjs/index";
export class Ticker {

    private timer: Observable<any>;
    private sub: Subscription = null;
    tick = new Subject();

    constructor( public ms: number = 1000 ) {
        this.timer =  interval(ms);
    }

    start() {
        this.sub = this.timer.subscribe(
            () => { this.tick.next(); }
        );
    }
    stop() {
        if (this.sub != null) {
            this.sub.unsubscribe();
            this.sub = null;
        }
    }
}