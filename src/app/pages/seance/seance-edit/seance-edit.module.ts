import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SeanceEditPage } from './seance-edit.page';
import {ComponentsModule} from "../../../components.module";

const routes: Routes = [
  {
    path: '',
    component: SeanceEditPage
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
  declarations: [SeanceEditPage]
})
export class SeanceEditPageModule {}
