import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {Bloc} from '../seance.interface';

@Component({
    selector: 'bloc-component',
    templateUrl: 'bloc.component.html',
    styleUrls : ['bloc.component.scss']
})

export class BlocComponent implements OnInit, OnDestroy {

    // private initTimeInSeconds = 4000;
    // private timeInSeconds = 0;

    // displayTime = this.getSecondsAsDigitalClock(this.timeInSeconds);
    //
    // private tickerSub: Subscription = null;
    // private ticker: Ticker;
    // event = new Subject();

    @Input() bloc: Bloc;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        // this.stop();
    }

}