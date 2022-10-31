import { MoviesComponent } from './movies.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';

@NgModule({
  imports: [CommonModule, MoviesRoutingModule],
  // declarations: [MoviesComponent],
})
export class MoviesModule {}
