import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {Fraction} from '../seance.interface';

@Component({
    selector: 'fraction-component',
    templateUrl: 'fraction.component.html',
    styleUrls : ['fraction.component.scss']
})

export class FractionComponent implements OnInit, OnDestroy {

    @Input() fraction: Fraction;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        // this.stop();
    }

}