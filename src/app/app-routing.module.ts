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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
