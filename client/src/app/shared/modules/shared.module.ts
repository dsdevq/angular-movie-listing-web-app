import { NoItemsComponent } from './../../components/no-items/no-items.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from '../../components/page/page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../components/button/button.component';
import { InputComponent } from '../../components/input/input.component';
import { MaterialModule } from './material.module';
import { MovieComponent } from '../../components/movie/movie.component';
import { RatingComponent } from '../../components/rating/rating.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { FilterPipe } from '../pipes/filter.pipe';
import { LetModule } from '@ngrx/component';
import { UrlPipe } from '../pipes/url.pipe';
import { TypePipe } from '../pipes/type.pipe';
import { GenresPipe } from '../pipes/genres.pipe';
import { ToggleDirective } from '../directives/toggle.directive';
import { LoadingImgDirective } from '../directives/loading-img.directive';
import { SkeletonDirective } from '../directives/skeleton/skeleton.directive';

const SharedComponents = [
  ButtonComponent,
  LoaderComponent,
  NoItemsComponent,
  InputComponent,
  PageComponent,
];

const SharedPipes = [UrlPipe, TypePipe, GenresPipe, FilterPipe];

const SharedDirectives = [ToggleDirective, LoadingImgDirective];
const SharedModules = [
  CommonModule,
  ReactiveFormsModule,
  MaterialModule,
  FormsModule,
  LetModule,
];

@NgModule({
  imports: [
    SharedModules,
    RouterModule,
    MovieComponent,
    RatingComponent,
    SkeletonDirective,
  ],
  declarations: [SharedComponents, SharedPipes, SharedDirectives],
  exports: [
    SharedModules,
    SharedPipes,
    SharedDirectives,
    SharedComponents,
    MovieComponent,
    RatingComponent,
  ],
})
export class SharedModule {}
