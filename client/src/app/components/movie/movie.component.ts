import { SkeletonDirective } from './../../shared/directives/skeleton/skeleton.directive';
import { MatIconModule } from '@angular/material/icon';
import { RatingComponent } from './../rating/rating.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IMovie } from 'src/app/shared/interfaces/interface';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    SkeletonDirective,
    MatIconModule,
    RouterModule,
    RatingComponent,
  ],
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  @Input() public movieProps: IMovie;
  @Input() public isSuggest: boolean;
  @Input() public isAddToList: boolean;

  @Output() public addMovie = new EventEmitter();
  public link: string;
  public isLoading: boolean = false;

  ngOnInit(): void {
    this.initMovie();
    // this.isLoading = false;
  }
  ngAfterViewInit(): void {
    // setTimeout(() => {
    // }, 1000);
  }

  private initMovie(): void {
    // this.isLoading = true;
    this.link = `/${this.movieProps.type}/${this.movieProps.id}`;
  }
  public handleClick(movie: IMovie): void {
    this.addMovie.emit(movie);
  }
}
