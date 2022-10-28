import { debounceTime, distinctUntilChanged, map, Observable } from 'rxjs';
import { IMovie } from 'src/app/shared/interface';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {
  @Input() heading: string;
  @Input() movies: IMovie[];
  public inputValue: FormGroup;
  public value$: Observable<string>;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initPage();
  }
  private initPage() {
    this.inputValue = this.fb.group({
      value: '',
    });
    this.value$ = this.inputValue.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(300),
      map((e: FormControl) => e.value)
    );
  }
}
