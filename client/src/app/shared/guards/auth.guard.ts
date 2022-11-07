import { UrlPipe } from './../pipes/url.pipe';
import { UiDataService } from './../services/ui-data.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private list$: Observable<string[]> = this.uiDataService.navList$;

  constructor(
    private authService: AuthService,
    private uiDataService: UiDataService,
    private router: Router,
    private urlPipe: UrlPipe
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!route.url[0] || route.url.length > 1) {
      return true;
    }

    // ! TODO REFACTOR
    let path: string = route.url[0].path;

    return this.list$.pipe(
      switchMap((list) =>
        this.authService.isLoggedIn$.pipe(
          map((islogged) => {
            let result = !!list.find((link) =>
              path.includes(this.urlPipe.transform(link))
            );
            if (!result && !islogged) {
              this.router.navigate(['/login']);
            }
            if (!result && islogged) {
              return true;
            }
            return result;
          })
        )
      )
    );
  }
}
