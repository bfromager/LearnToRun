import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { DebugPage } from './debug.page';
import {ComponentsModule} from "../../components.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: DebugPage
      }
    ])
  ],
  declarations: [
      DebugPage,
  ],
})
export class DebugPageModule {}
