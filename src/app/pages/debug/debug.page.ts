import { Component } from '@angular/core';
import {MediaService} from "../../services/music/media/media.service";

@Component({
    selector: 'app-debug',
    templateUrl: 'debug.page.html',
    styleUrls: ['debug.page.scss'],
})
export class DebugPage {

    constructor(private mediaService: MediaService) {

    }
}
