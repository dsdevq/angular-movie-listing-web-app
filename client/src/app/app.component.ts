import { UiDataService } from './shared/services/ui-data.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit {
  @ViewChild('sidenav')
  public sidenav: MatSidenav;

  public list$: Observable<string[]>;

  constructor(private uiService: UiDataService) {}

  ngOnInit(): void {
    this.initApp();
  }
  private initApp(): void {
    this.list$ = this.uiService.navList$;
  }

  ngAfterViewInit(): void {
    this.uiService.setSidenav(this.sidenav);
  }
}
