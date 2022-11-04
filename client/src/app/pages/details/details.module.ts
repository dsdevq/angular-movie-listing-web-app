import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/modules/shared.module';
import { DetailsComponent } from './details.component';
import { DetailsRoutingModule } from './details-routing.module';

@NgModule({
  imports: [CommonModule, DetailsRoutingModule, SharedModule],
  declarations: [DetailsComponent],
})
export class DetailsModule {}
