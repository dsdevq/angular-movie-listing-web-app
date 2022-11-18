import { Error404Component } from './pages/error404/error404.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('./pages/movies/movies.module').then((m) => m.MoviesModule),
  },
  {
    path: 'tv-shows',
    loadChildren: () =>
      import('./pages/tv-shows/tv-shows.module').then((m) => m.TvShowsModule),
  },
  {
    path: ':type/:id',
    loadChildren: () =>
      import('./pages/details/details.module').then((m) => m.DetailsModule),
  },
  {
    path: 'suggest-me',
    loadChildren: () =>
      import('./pages/suggest-me/suggest-me.module').then(
        (m) => m.SuggestMeModule
      ),
  },
  {
    path: 'login',
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
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./pages/sign-up/sign-up.module').then((m) => m.SignUpModule),
  },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
