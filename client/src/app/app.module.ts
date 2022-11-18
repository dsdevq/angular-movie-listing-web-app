import { UrlPipe } from './shared/pipes/url.pipe';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { AuthGuard } from './shared/guards/auth.guard';
import { UserEffects } from './state/user/user.effects';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/modules/shared.module';
import { AppInitializerService } from './shared/services/app-initializer.service';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SelectEffects } from './state/selected/selected.effects';
import { selectReducer } from './state/selected/selected.reducer';
import { moviesReducer } from './state/movies/movies.reducer';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MovieEffects } from './state/movies/movies.effects';
import { IAppState } from './shared/interfaces/interface';
import { environment } from 'src/environments/environment';
import { Error404Component } from './pages/error404/error404.component';
import { userReducer } from './state/user/user.reducer';
import { JwtModule } from '@auth0/angular-jwt';
import { NavItemComponent } from './components/nav-items/nav-items.component';

export const initializeApp =
  (appInitService: AppInitializerService): (() => void) =>
  (): Promise<void> =>
    appInitService.init();

const tokenGetter = () => localStorage.getItem('id_token');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    Error404Component,
    NavItemComponent,
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
      },
    }),
    StoreModule.forRoot<IAppState>({
      moviesState: moviesReducer,
      selectedState: selectReducer,
      user: userReducer,
    }),
    EffectsModule.forRoot([MovieEffects, SelectEffects, UserEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
  ],
  providers: [
    AppInitializerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppInitializerService],
      multi: true,
    },
    AuthGuard,
    UrlPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
