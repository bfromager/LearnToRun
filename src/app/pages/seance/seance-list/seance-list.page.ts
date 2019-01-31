import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SeancesComponent} from '../../../services/seance/seances/components/seances.component';
import {Subscription} from 'rxjs/index';
import {Router} from '@angular/router';
import {SeancesService} from '../../../services/seance/seances/seances.service';
import {Seance} from '../../../services/seance/seance';

@Component({
  selector: 'app-seance-list',
  templateUrl: './seance-list.page.html',
  styleUrls: ['./seance-list.page.scss']
})
export class SeanceListPage implements OnInit, OnDestroy {
    @ViewChild(SeancesComponent) seances: SeancesComponent;
    private seanceClickSub: Subscription;
    private seanceCreateSub: Subscription;

    constructor(private router: Router, private seancesService: SeancesService) { }

    ngOnInit() {
        this.seanceClickSub = this.seances.seanceClick.subscribe(
            (seance: Seance) => {
                this.seancesService.setEditingSeance(seance);
                this.router.navigateByUrl('/seance-edit');
            }
        );
        this.seanceCreateSub = this.seances.seanceCreate.subscribe(
            (seanceName: string) => {
                this.router.navigateByUrl('/seance-edit');
            }
        );
    }

    ngOnDestroy() {
        this.seanceClickSub.unsubscribe();
        this.seanceCreateSub.unsubscribe();
    }
}
