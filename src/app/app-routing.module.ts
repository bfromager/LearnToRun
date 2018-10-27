import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//https://angularfirebase.com/lessons/ionic-4-routing-and-navigation-guide/

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
  {
    path: 'list',
    loadChildren: './pages/list/list.module#ListPageModule'
  },
  { path: 'playlists', loadChildren: './pages/playlist/playlist-list/playlist-list.module#PlaylistListPageModule' },

  { path: 'playlist-edit', loadChildren: './pages/playlist/playlist-edit/playlist-edit.module#PlaylistEditPageModule' },
  { path: 'mp3-list', loadChildren: './pages/playlist/mp3-list/mp3-list.module#Mp3ListPageModule' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
