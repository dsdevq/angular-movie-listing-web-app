import { UiDataService } from './shared/services/ui-data.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { EPages } from './shared/interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit {
  @ViewChild('sidenav') public sidenav: MatSidenav;

  public list: string[];
  public EPage = EPages;

  constructor(private ui: UiDataService) {}

  ngOnInit(): void {
    this.initApp();
  }
  private initApp(): void {
    this.list = this.ui.list;
  }

  ngAfterViewInit(): void {
    this.ui.setSidenav(this.sidenav);
  }
}
