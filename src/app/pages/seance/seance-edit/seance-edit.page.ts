import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs/index";
import {Seance} from '../../../services/seance/seance';
import {SeanceEditComponent} from '../../../services/seance/components/seanceEdit.component';

@Component({
    selector: 'app-seance-edit',
    templateUrl: './seance-edit.page.html',
    styleUrls: ['./seance-edit.page.scss'],
})
export class SeanceEditPage implements OnInit {
    @ViewChild(SeanceEditComponent) seanceEdit: SeanceEditComponent;

    public seance: Seance;
    public seanceName: string;
    // private seanceAddMp3Sub: Subscription;

    constructor(private router: Router) {
    }

    ngOnInit() {
        this.seance = this.seanceEdit.seance;
        this.seanceName = this.seance.getName();
        // this.seanceAddMp3Sub = this.seanceEdit.seanceAddMp3.subscribe(
        //     () => {
        //         this.router.navigateByUrl('/mp3-list');
        //     }
        // )
    }

    ngOnDestroy() {
        // this.seanceAddMp3Sub.unsubscribe();
    }

    rename() {
        // this.seanceEdit.rename().then((name)=>{this.seanceName = name;});
    }
}
