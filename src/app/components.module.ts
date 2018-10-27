import {IonicModule} from "@ionic/angular";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {Mp3ListComponent} from "./services/music/mp3List/mp3List.component";
import {MediaPlayerComponent} from "./services/music/mediaplayer/mediaPlayer.component";
import {CountDownComponent} from "./services/seance/countdown/countDown.component";
import {SeanceComponent} from "./services/seance/seance.component";
import {PlaylistsComponent} from "./services/music/playlist/playlists/playlists.component";
import {PlaylistPickerComponent} from "./services/music/playlist/playlists/picker/playlistPicker.component";

@NgModule({
    declarations: [
        PlaylistsComponent,
        PlaylistPickerComponent,
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
        PlaylistsComponent,
        PlaylistPickerComponent,
        Mp3ListComponent,
        MediaPlayerComponent,
        CountDownComponent,
        SeanceComponent,
    ],
})
export class ComponentsModule { }