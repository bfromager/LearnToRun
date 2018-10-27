import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Mp3ListPage } from './mp3-list.page';
import {ComponentsModule} from "../../../components.module";

const routes: Routes = [
  {
    path: '',
    component: Mp3ListPage
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
  declarations: [
      Mp3ListPage,
  ]
})
export class Mp3ListPageModule {}
