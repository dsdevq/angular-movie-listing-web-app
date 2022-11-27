import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import {
  MatSidenavContainer,
  MatSidenavModule,
} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

const MaterialModules = [
  MatListModule,
  MatIconModule,
  MatInputModule,
  MatTabsModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatButtonModule,
  MatDialogModule,
];

@NgModule({
  declarations: [],
  providers: [MatSidenavContainer],
  imports: [MaterialModules],
  exports: [MaterialModules],
})
export class MaterialModule {}
