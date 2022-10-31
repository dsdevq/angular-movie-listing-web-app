import { Error404Component } from './pages/error404/error404.component';
import { SuggestMeComponent } from './pages/suggest-me/suggest-me.component';
import { DetailsComponent } from './components/details/details.component';
import { TvShowsComponent } from './pages/tv-shows/tv-shows.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./pages/home/home.module').then((m) => m.HomeModule),
  // },
  { path: '', component: HomeComponent },
  {
    path: 'movies',
    loadChildren: () =>
      import('./pages/movies/movies.module').then((m) => m.MoviesModule),
  },
  { path: 'tv-shows', component: TvShowsComponent },
  { path: ':type/:id', component: DetailsComponent },
  { path: 'suggest-me', component: SuggestMeComponent },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
