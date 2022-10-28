import { DetailsComponent } from './components/details/details.component';
import { TvShowsComponent } from './pages/tv-shows/tv-shows.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'tv-shows', component: TvShowsComponent },
  { path: ':movie|tv/:id', component: DetailsComponent },
  {
    path: ':movies|tvs/:movie|tv/:id',
    redirectTo: ':movie|tv/:id',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
