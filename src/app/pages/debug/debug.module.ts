import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { DebugPage } from './debug.page';

import {Mp3ListComponent} from "../../services/music/mp3List/mp3List.component";
import {MediaPlayerComponent} from "../../services/music/mediaplayer/mediaPlayer.component";
import {CountDownComponent} from "../../services/seance/countdown/countDown.component";
import {SeanceComponent} from "../../services/seance/seance.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: DebugPage
      }
    ])
  ],
  declarations: [
      DebugPage,
      Mp3ListComponent,
      MediaPlayerComponent,
      CountDownComponent,
      SeanceComponent,
  ],
})
export class DebugPageModule {}
