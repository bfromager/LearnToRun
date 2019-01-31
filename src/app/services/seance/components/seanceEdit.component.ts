import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subject} from "rxjs/index";
import {AlertController} from "@ionic/angular";
import {Seance} from '../seance';
import {SeancesService} from '../seances/seances.service';

@Component({
    selector: 'seance-edit-component',
    templateUrl: './seanceEdit.component.html',
})
export class SeanceEditComponent implements OnInit, OnDestroy {

    public seance : Seance = null;
    // public seanceAddMp3: Subject<void> = new Subject<void>();

    constructor(private seancesService: SeancesService, private alertController: AlertController) {
        this.seance = this.seancesService.getEditingSeance();
    }

    ngOnInit() {
    }
    ngOnDestroy() {
    }

    public rename(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.alertController.create({
                header: 'Nom de la séance',
                inputs: [
                    {
                        name: 'seanceName',
                        type: 'text',
                        // placeholder: 'Placeholder 1',
                        value: this.seance.getName(),
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
                            let seanceName = inputs.seanceName;
                            this.seance.setName(seanceName);
                            this.seancesService.save();
                            resolve(seanceName);
                        }
                    }
                ]
            })
                .then((alertForm) => {
                        alertForm.present().then(() => {
                            // const firstInput: any = document.querySelector('ion-alert input');
                            // firstInput.focus();
                            // return;
                        });
                    }
                );
        })
    }

    // addMp3() {
    //     this.seanceAddMp3.next();
    // }
    //
    // delMp3(index: number) {
    //     this.seance.del(index);
    //     this.seancesService.save();
    // }

    reorder(event) {
        // this.seance.reorder(event.detail.from, event.detail.to);
        // this.seancesService.save();
    }
}
