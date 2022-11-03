import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MatSidenavContainer,
  MatSidenavModule,
} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

const MaterialComponents = [
  MatListModule,
  MatIconModule,
  MatInputModule,
  MatTabsModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatButtonModule,
];

@NgModule({
  declarations: [],
  providers: [MatSidenavContainer],
  imports: [MaterialComponents],
  exports: [MaterialComponents],
})
export class MaterialModule {}
