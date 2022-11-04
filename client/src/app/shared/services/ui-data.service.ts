import { AuthService } from 'src/app/shared/services/auth.service';
import { Observable, map, BehaviorSubject } from 'rxjs';
import { EPages, EPagesAuthorized } from '../interfaces/interface';
import { Injectable } from '@angular/core';
import { MatDrawerToggleResult, MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class UiDataService {
  public sidenav: MatSidenav;
  private list: string[] = Object.values(EPages);
  private listAuthorized: string[] = Object.values(EPagesAuthorized);

  public navList$: Observable<string[]> = this.authService.isLoggedIn$.pipe(
    map((isLogged) => {
      if (isLogged) {
        return this.listAuthorized;
      }
      return this.list;
    })
  );

  constructor(private authService: AuthService) {}

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
