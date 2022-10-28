import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IMovie } from 'src/app/shared/interface';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  @Input() public movieProps: IMovie;
  public link: string;
  public inputField: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.initMovie();
  }

  private initMovie(): void {
    this.link = `${this.movieProps.type}/${this.movieProps.id}`;
  }
}
