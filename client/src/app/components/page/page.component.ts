import { ESearchInputSettings } from '../../shared/interfaces/interface';
import { debounceTime, distinctUntilChanged, map, Observable } from 'rxjs';
import { IMovie } from 'src/app/shared/interfaces/interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {
  @Input() heading: string;
  @Input() movies: IMovie[];
  @Output() loadMore = new EventEmitter<void>();
  public inputValue: FormGroup;
  public value$: Observable<string>;
  constructor(private fb: FormBuilder) {}
  public EInputSettings = ESearchInputSettings;

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
  public handleClick(): void {
    this.loadMore.emit();
  }
}
