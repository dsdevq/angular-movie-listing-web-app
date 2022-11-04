import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuggestionsRoutingModule } from './suggestions-routing.module';
import { SuggestionsComponent } from './suggestions.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';

@NgModule({
  declarations: [SuggestionsComponent],
  imports: [CommonModule, SuggestionsRoutingModule, SharedModule],
})
export class SuggestionsModule {}
