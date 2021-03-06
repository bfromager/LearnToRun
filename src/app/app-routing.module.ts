import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// https://angularfirebase.com/lessons/ionic-4-routing-and-navigation-guide/
// https://forum.ionicframework.com/t/ionic-4-pass-data-between-pages/139601/6

const routes: Routes = [
  {
    path: '',
    redirectTo: 'debug',
    pathMatch: 'full'
  },
  {
    path: 'debug',
    loadChildren: './pages/debug/debug.module#DebugPageModule'
  },
  { path: 'seance', loadChildren: './pages/seance/seance.module#SeancePageModule' },

  { path: 'playlists', loadChildren: './pages/playlist/playlist-list/playlist-list.module#PlaylistListPageModule' },
  { path: 'playlist-edit', loadChildren: './pages/playlist/playlist-edit/playlist-edit.module#PlaylistEditPageModule' },
  { path: 'mp3-list', loadChildren: './pages/playlist/mp3-list/mp3-list.module#Mp3ListPageModule' },

  { path: 'seance-list', loadChildren: './pages/seance/seance-list/seance-list.module#SeanceListPageModule'  },
  { path: 'seance-edit', loadChildren: './pages/seance/seance-edit/seance-edit.module#SeanceEditPageModule' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
