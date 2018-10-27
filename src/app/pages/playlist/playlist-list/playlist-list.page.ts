import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

// https://angularfirebase.com/lessons/ionic-4-routing-and-navigation-guide/

@Component({
    selector: 'app-playlist-list',
    templateUrl: './playlist-list.page.html',
    styleUrls: ['./playlist-list.page.scss'],
})
export class PlaylistListPage implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {

    }

    edit() {
        this.router.navigateByUrl('/playlist-edit');
    }
}
