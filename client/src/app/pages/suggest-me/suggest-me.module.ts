import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/modules/shared.module';
import { SuggestMeComponent } from './suggest-me.component';
import { SuggestMeRoutingModule } from './suggest-me-routing.module';

@NgModule({
  imports: [CommonModule, SuggestMeRoutingModule, SharedModule],
  declarations: [SuggestMeComponent],
})
export class SuggestMeModule {}
