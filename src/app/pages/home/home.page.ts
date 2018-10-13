import { Component } from '@angular/core';
import {MediaService} from "../../services/music/media/media.service";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor(private mediaService: MediaService) {

    }
}
