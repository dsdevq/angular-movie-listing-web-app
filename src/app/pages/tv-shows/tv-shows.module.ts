import { TvShowsComponent } from './tv-shows.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvShowsRoutingModule } from './tv-shows-routing.module';

@NgModule({
  // declarations: [TvShowsComponent],
  imports: [CommonModule, TvShowsRoutingModule],
})
export class TvShowsModule {}
