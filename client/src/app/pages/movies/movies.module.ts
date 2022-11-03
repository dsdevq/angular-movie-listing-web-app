import { MoviesComponent } from './movies.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';

@NgModule({
  imports: [CommonModule, MoviesRoutingModule, SharedModule],
  declarations: [MoviesComponent],
})
export class MoviesModule {}
