import {IonicModule} from "@ionic/angular";
import {NgModule} from "@angular/core";

import {Mp3ListComponent} from "./services/music/mp3List/mp3List.component";
import {MediaPlayerComponent} from "./services/music/mediaplayer/mediaPlayer.component";
import {CountDownComponent} from "./services/seance/countdown/countDown.component";
import {SeanceComponent} from "./services/seance/seance.component";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [
        Mp3ListComponent,
        MediaPlayerComponent,
        CountDownComponent,
        SeanceComponent,
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        Mp3ListComponent,
        MediaPlayerComponent,
        CountDownComponent,
        SeanceComponent,
    ],
})
export class ComponentsModule { }