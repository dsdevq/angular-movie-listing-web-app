import { AuthService } from 'src/app/shared/services/auth.service';
import { EPages, EPagesAuthorized } from '../interfaces/interface';
import { Injectable, OnInit } from '@angular/core';
import { MatDrawerToggleResult, MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class UiDataService {
  public list: string[] = Object.values(EPages);
  public listAuthorized: string[] = Object.values(EPagesAuthorized);
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
