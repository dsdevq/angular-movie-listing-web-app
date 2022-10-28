import { Component, Input, OnInit } from '@angular/core';
import { IMovie } from 'src/app/shared/interface';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  @Input() public movieProps: IMovie;
  @Input() public isSuggest: boolean;
  public link: string;

  constructor() {}

  ngOnInit(): void {
    this.initMovie();
  }

  private initMovie(): void {
    this.link = `${this.movieProps.type}/${this.movieProps.id}`;
  }
}
