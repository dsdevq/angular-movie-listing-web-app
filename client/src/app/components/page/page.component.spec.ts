import { FilterPipe } from './../../shared/pipes/filter.pipe';
import { first } from 'rxjs';
import { PageComponent } from './page.component';
import {
  TestBed,
  ComponentFixture,
  getTestBed,
  waitForAsync,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from 'src/app/shared/interfaces/interface';
describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;
  let store: MockStore<IAppState>;
  let injector: TestBed;
  let initialState: IAppState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [PageComponent, FilterPipe],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;

    injector = getTestBed();

    store = injector.inject(MockStore);
    store.setState({} as IAppState);
  });

  describe('FormGroup', () => {
    it('value$ should emit a new value from form changes', waitForAsync(() => {
      let testValue = '123';
      component.ngOnInit();

      component.value$.pipe(first()).subscribe((value) => {
        expect(value).toBe(testValue);
      });

      component.inputValue.controls['value'].setValue(testValue);
    }));
  });

  describe('Output', () => {
    it('Should emit action on click', () => {
      component.ngOnInit();
      spyOn(component.loadMore, 'emit');

      component.handleClick();

      expect(component.loadMore.emit).toHaveBeenCalled();
    });
  });
});
