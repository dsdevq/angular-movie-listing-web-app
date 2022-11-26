import { EPagesAuthorized } from './../../shared/interfaces/interface';
import { AuthService } from './../../shared/services/auth.service';
import { UiDataService } from './../../shared/services/ui-data.service';
import { ESearchInputSettings } from '../../shared/interfaces/interface';
import { Observable } from 'rxjs';
import { IMovie } from 'src/app/shared/interfaces/interface';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  // ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class PageComponent implements OnInit {
  @Input() heading: string;
  @Input() movies: IMovie[];
  @Output() loadMore = new EventEmitter<void>();
  public inputValue: FormGroup;
  public value$: Observable<string>;
  public isLogged$: Observable<boolean>;
  public EInputSettings = ESearchInputSettings;
  public EPagesAuth = EPagesAuthorized;

  constructor(
    private uiDataService: UiDataService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.initPage();
  }
  private initPage() {
    this.inputValue = this.uiDataService.inputField();
    this.isLogged$ = this.authService.isLoggedIn$;
    this.value$ = this.uiDataService.newValueChanges(
      this.inputValue.valueChanges
    );
  }
  public handleClick(): void {
    this.loadMore.emit();
  }
}
