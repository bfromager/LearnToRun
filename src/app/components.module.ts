import {IonicModule} from "@ionic/angular";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {Mp3ListComponent} from "./services/music/mp3List/mp3List.component";
import {MediaPlayerComponent} from "./services/music/mediaplayer/components/mediaPlayer.component";
import {CountDownComponent} from "./services/seance/countdown/countDown.component";
import {SeanceComponent} from "./services/seance/components/seance.component";
import {PlaylistsComponent} from "./services/music/playlist/playlists/components/playlistsList/playlists.component";
import {PlaylistPickerComponent} from "./services/music/playlist/playlists/components/picker/playlistPicker.component";
import {PlaylistEditComponent} from "./services/music/playlist/components/playlistEdit.component";
import {SeancesComponent} from './services/seance/seances/components/seances.component';
import {SeanceEditComponent} from './services/seance/components/seanceEdit.component';
import {BlocComponent} from './services/seance/bloc/bloc.component';
import {FractionComponent} from './services/seance/fraction/fraction.component';

@NgModule({
    declarations: [
        PlaylistsComponent,
        PlaylistPickerComponent,
        PlaylistEditComponent,
        Mp3ListComponent,
        MediaPlayerComponent,
        CountDownComponent,
        SeanceComponent,
        SeancesComponent,
        SeanceEditComponent,
        BlocComponent,
        FractionComponent,
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        PlaylistsComponent,
        PlaylistPickerComponent,
        PlaylistEditComponent,
        Mp3ListComponent,
        MediaPlayerComponent,
        CountDownComponent,
        SeanceComponent,
        SeancesComponent,
        SeanceEditComponent,
        BlocComponent,
        FractionComponent,
    ],
})
export class ComponentsModule { }