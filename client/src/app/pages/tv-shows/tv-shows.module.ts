import { TvShowsComponent } from './tv-shows.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvShowsRoutingModule } from './tv-shows-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';

@NgModule({
  imports: [CommonModule, TvShowsRoutingModule, SharedModule],
  declarations: [TvShowsComponent],
})
export class TvShowsModule {}
