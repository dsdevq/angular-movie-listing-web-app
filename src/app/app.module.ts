import { FilterPipe } from './shared/pipes/filter.pipe';
import { TypePipe } from './shared/pipes/type.pipe';
import { GenresPipe } from './shared/pipes/genres.pipe';
import { UrlPipe } from './shared/pipes/url.pipe';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SelectEffects } from './state/selected/selected.effects';
import { selectReducer } from './state/selected/selected.reducer';
import { tvShowsReducer } from './state/tv-shows/tv-shows.reducer';
import { moviesReducer } from './state/movies/movies.reducer';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { MovieComponent } from './components/movie/movie.component';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { TvShowsComponent } from './pages/tv-shows/tv-shows.component';
import { InputComponent } from './components/input/input.component';
import { MaterialModule } from './material/material.module';
import { StoreModule } from '@ngrx/store';
import { PageComponent } from './components/page/page.component';
import { DetailsComponent } from './components/details/details.component';
import { RatingComponent } from './components/rating/rating.component';
import { EffectsModule } from '@ngrx/effects';
import { MovieEffects } from './state/movies/movies.effects';
import { TvShowsEffects } from './state/tv-shows/tv-shows.effects';
import { IAppState } from './shared/interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { LoaderComponent } from './components/loader/loader.component';
import { ButtonComponent } from './components/button/button.component';
import { SuggestMeComponent } from './pages/suggest-me/suggest-me.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { Error404Component } from './pages/error404/error404.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MovieComponent,
    HomeComponent,
    MoviesComponent,
    TvShowsComponent,
    InputComponent,
    PageComponent,
    DetailsComponent,
    RatingComponent,
    LoaderComponent,
    GenresPipe,
    UrlPipe,
    TypePipe,
    FilterPipe,
    ButtonComponent,
    SuggestMeComponent,
    MovieListComponent,
    Error404Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot<IAppState>({
      moviesState: moviesReducer,
      tvShowsState: tvShowsReducer,
      selectedState: selectReducer,
    }),
    EffectsModule.forRoot([MovieEffects, TvShowsEffects, SelectEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
