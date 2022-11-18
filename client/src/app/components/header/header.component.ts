import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import {
  ENavItems,
  EPages,
  EPagesAuthorized,
} from '../../shared/interfaces/interface';
import { UiDataService } from './../../shared/services/ui-data.service';
import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public list: string[];
  public listAuthorized: string[];
  public isMenuOpen: boolean;
  public ENavItem = ENavItems;
  public EPage = EPages;
  public EPagesAuthorized = EPagesAuthorized;

  public isLogged$: Observable<boolean>;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private uiService: UiDataService,
    private authService: AuthService
  ) {
    this.matIconRegistry.addSvgIcon(
      'logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/logo-icon.svg'
      )
    );
  }

  ngOnInit(): void {
    this.initHeader();
  }

  private initHeader(): void {
    this.list = this.uiService.list;
    this.listAuthorized = this.uiService.listAuthorized;
    this.isLogged$ = this.authService.isLoggedIn$;
  }

  public logout(): void {
    this.authService.logout();
  }
  public toggleSidenav() {
    this.uiService.toggle();
    this.isMenuOpen = this.uiService.sidenav.opened;
  }
}
