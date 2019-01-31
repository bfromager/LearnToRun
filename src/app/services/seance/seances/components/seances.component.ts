import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subject, Subscription} from "rxjs/index";
import {AlertController} from "@ionic/angular";
import {Seance} from '../../seance';
import {SeancesService} from '../seances.service';
@Component({
    selector: 'seances-component',
    templateUrl: './seances.component.html',
})
export class SeancesComponent implements OnInit, OnDestroy {

    private seances : Seance[] = [];
    public seanceClick: Subject<Seance> = new Subject<Seance>();
    public seanceCreate: Subject<string> = new Subject<string>();
    private seanceChangeSub: Subscription;

    constructor(private seancesService: SeancesService, private alertController: AlertController) {
    }

    ngOnInit() {
        this.seances = this.seancesService.getSeances();
        this.seanceChangeSub =  this.seancesService.seancesChange.subscribe(
            (seances: Seance[]) => {
                this.seances = seances;
            }
        );
    }
    ngOnDestroy() {
        this.seanceChangeSub.unsubscribe();
    }

    itemClick(seance: Seance){
        this.seanceClick.next(seance);
    }

    showAlert() {
        this.alertController.create({
            header: 'Nom de la séance',
            inputs: [
                {
                    name: 'seanceName',
                    type: 'text',
                    // placeholder: 'Placeholder 1',
                    value: 'Nouvelle séance',
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    // handler: () => {
                    //     console.log('Confirm Cancel');
                    // }
                },
                {
                    text: 'Ok',
                    handler: (inputs) => {
                        this.createSeance(inputs.seanceName);
                    }
                }
            ]
        })
            .then ( (alertForm) => {
                    alertForm.present();
                }
            );
    }

    private createSeance(seanceName) {
        this.seancesService.add(seanceName);
        this.seanceCreate.next(seanceName);
    }
}
