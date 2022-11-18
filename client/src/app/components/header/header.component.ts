import { Observable } from 'rxjs';
import { UiDataService } from './../../shared/services/ui-data.service';
import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public isMenuOpened$: Observable<boolean>;

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

  public toggleSidenav(): void {
    this.uiService.toggle();
    if (!this.isMenuOpened$) {
      this.isMenuOpened$ = this.uiService.sidenav.openedChange;
    }
  }
}
