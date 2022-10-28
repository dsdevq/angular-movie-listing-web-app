import { IMovie } from './../../shared/interface';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  @Input() movies: IMovie[] | null;
  public isSuggest: boolean;
  constructor(private route: Router) {}

  ngOnInit(): void {
    this.isSuggest = this.route.url.split('/')[1] === 'suggest-me';
    console.log(this.isSuggest);
  }
}
