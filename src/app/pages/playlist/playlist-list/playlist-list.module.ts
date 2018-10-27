import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PlaylistListPage } from './playlist-list.page';
import {ComponentsModule} from "../../../components.module";

const routes: Routes = [
  {
    path: '',
    component: PlaylistListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PlaylistListPage]
})
export class PlaylistListPageModule {}
