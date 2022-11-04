import { UiDataService } from '../../shared/services/ui-data.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ENavItems,
  EPages,
  EPagesAuthorized,
} from 'src/app/shared/interfaces/interface';

@Component({
  selector: 'app-nav-items',
  templateUrl: './nav-items.component.html',
  styleUrls: ['./nav-items.component.scss'],
})
export class NavItemComponent implements OnInit {
  public list$: Observable<string[]>;
  public ENavItem = ENavItems;
  public EPage = EPages;
  public EPagesAuthorized = EPagesAuthorized;

  constructor(
    private authService: AuthService,
    private uiService: UiDataService
  ) {}

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.list$ = this.uiService.navList$;
  }

  public logout(): void {
    this.authService.logout();
  }
}
