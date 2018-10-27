import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-playlist-edit',
    templateUrl: './playlist-edit.page.html',
    styleUrls: ['./playlist-edit.page.scss'],
})
export class PlaylistEditPage implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
    }

    mp3(){
        this.router.navigateByUrl('/mp3-list');
    }
}
