import { ENavItems } from './../../shared/interface';
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
  public isMenuOpen: boolean;
  public ENavItem = ENavItems;
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private uiService: UiDataService
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
  }
  public toggleSidenav() {
    this.uiService.toggle();
    this.isMenuOpen = this.uiService.sidenav.opened;
  }
}
