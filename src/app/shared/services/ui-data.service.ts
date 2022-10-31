import { EPages } from './../interface';
import { Injectable } from '@angular/core';
import { MatDrawerToggleResult, MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class UiDataService {
  public list: string[] = Object.values(EPages);

  public sidenav: MatSidenav;

  public setSidenav(sidenav: MatSidenav): void {
    this.sidenav = sidenav;
  }

  public open(): Promise<MatDrawerToggleResult> {
    return this.sidenav.open();
  }

  public close(): Promise<MatDrawerToggleResult> {
    return this.sidenav.close();
  }

  public toggle(): void {
    this.sidenav.toggle();
  }
}
