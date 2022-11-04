import { Error404Component } from './pages/error404/error404.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'movies',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/movies/movies.module').then((m) => m.MoviesModule),
  },
  {
    path: 'tv-shows',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/tv-shows/tv-shows.module').then((m) => m.TvShowsModule),
  },
  {
    path: ':type/:id',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/details/details.module').then((m) => m.DetailsModule),
  },
  {
    path: 'suggest-me',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/suggest-me/suggest-me.module').then(
        (m) => m.SuggestMeModule
      ),
  },
  {
    path: 'login',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'suggestions',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/suggestions/suggestions.module').then(
        (m) => m.SuggestionsModule
      ),
  },
  {
    path: 'add',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/add/add.module').then((m) => m.AddModule),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],

    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
