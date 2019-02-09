// https://www.youtube.com/watch?v=jRxPOs1OM34

import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {Bloc} from '../seance.interface';
import {PopoverController} from '@ionic/angular';
import {SeancesService} from '../seances/seances.service';
import {Seance} from '../seance';
import {AssetService} from '../../files/asset.service';

@Component({
    selector: 'bloc-component',
    templateUrl: 'bloc.component.html',
    styleUrls : ['bloc.component.scss']
})

export class BlocComponent implements OnInit, OnDestroy {

    private nestingColors: string[] = ["#2ba84a","#ee8434","#2b9eb3","#fcab10","#f8333c"];

    // private initTimeInSeconds = 4000;
    // private timeInSeconds = 0;

    // displayTime = this.getSecondsAsDigitalClock(this.timeInSeconds);
    //
    // private tickerSub: Subscription = null;
    // private ticker: Ticker;
    // event = new Subject();

    @Input() bloc: Bloc;
    private seance: Seance;

    constructor(private seancesService: SeancesService, private asset: AssetService, private popoverController: PopoverController) {
        this.seance = this.seancesService.getEditingSeance();
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        // this.stop();
    }


    // async presentPopover(ev: any) {
    //     const popover = await this.popoverController.create({
    //         component: GroupMenuComponent,
    //         event: ev,
    //         translucent: true
    //     });
    //     return await popover.present();
    // }
    //
    getColor() {
        return this.nestingColors[this.bloc.nesting % this.nestingColors.length]
    }

    reorder(event) {
        // this.playlist.reorder(event.detail.from, event.detail.to);
        // this.playlistsService.save();
    }

    btnMenu() {
        console.log("btnMenu");
        // this.presentPopover(null);
    }

    public addGroup() {
        this.seance.addBloc(this.bloc);
    }

    public addFraction() {
        this.seance.addFraction({type: "Fraction", timeInSecond:60, libelle: "Course", waveBegin: this.asset.getWavePath("Alarme.wav")},this.bloc);
    }

}