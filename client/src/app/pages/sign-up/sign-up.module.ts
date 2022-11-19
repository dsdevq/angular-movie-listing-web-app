import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';

@NgModule({
  imports: [CommonModule, SignUpRoutingModule, SharedModule],
  declarations: [SignUpComponent],
})
export class SignUpModule {}