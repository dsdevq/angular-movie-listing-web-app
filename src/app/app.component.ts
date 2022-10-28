import { UiDataService } from './shared/services/ui-data.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit {
  @ViewChild('sidenav') public sidenav: MatSidenav;

  public title = 'movie-listing-web-app';
  public list: string[];
  constructor(private ui: UiDataService) {}

  ngOnInit(): void {
    this.list = this.ui.list;
  }

  ngAfterViewInit(): void {
    this.ui.setSidenav(this.sidenav);
  }
}
