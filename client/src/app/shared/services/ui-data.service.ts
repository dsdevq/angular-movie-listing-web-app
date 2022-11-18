import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import {
  Observable,
  map,
  debounceTime,
  distinctUntilChanged,
  catchError,
} from 'rxjs';
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
    map((isLogged) => (isLogged ? this.listAuthorized : this.list))
  );

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  public inputField = () =>
    this.fb.group({
      value: '',
    });

  public newValueChanges = (
    obs: Observable<FormControl<string>>
  ): Observable<string> =>
    obs.pipe(
      debounceTime(300),
      map((e: FormControl) => e.value),
      distinctUntilChanged(),
      catchError((e) => {
        throw new Error(`Error! ${e}`);
      })
    );

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
