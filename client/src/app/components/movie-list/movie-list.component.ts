import { EPagesAuthorized } from './../../shared/interfaces/interface';
import { IMovie, EPages } from '../../shared/interfaces/interface';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  @Input() movies: IMovie[];
  public isSuggest: boolean;
  public isSuggestions: boolean;
  constructor(private route: Router) {}

  ngOnInit(): void {
    this.initMovieList();
  }
  private initMovieList() {
    this.isSuggest = this.route.url
      .split('/')
      .includes(EPages.SUGGEST.toLowerCase().split(' ').join('-'));
    this.isSuggestions = this.route.url
      .split('/')
      .includes(
        EPagesAuthorized.SUGGESTIONS.toLowerCase().split(' ').join('-')
      );
  }
}
