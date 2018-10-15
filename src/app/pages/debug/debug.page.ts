import { Component } from '@angular/core';
import {VocalService} from "../../services/seance/alarm/vocal/vocal.service";

@Component({
    selector: 'app-debug',
    templateUrl: 'debug.page.html',
    styleUrls: ['debug.page.scss'],
})
export class DebugPage {

    constructor(private vocalService: VocalService) {

    }

    btnTextToSpeech(){
        this.vocalService.speech("Course lente 10 minutes");
    }
}
