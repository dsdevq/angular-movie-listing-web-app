import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuggestMeComponent } from './suggest-me.component';

const routes: Routes = [{ path: '', component: SuggestMeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuggestMeRoutingModule {}
