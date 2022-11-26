import { IMovie } from './../../shared/interfaces/interface';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { first } from 'rxjs';
import { MovieComponent } from './movie.component';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLinkWithHref } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  let compiled: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [MovieComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement;
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('raises the addMovie event when clicked', () => {
    const movie = {} as IMovie;

    component.addMovie
      .pipe(first())
      .subscribe((movieClicked: IMovie) => expect(movieClicked).toEqual(movie));
    component.handleClick(movie);
  });

  it('should initialize link after Angular calls ngOnInit and return undefined before OnInit', () => {
    component.movieProps = {} as IMovie;
    expect(component.link).toBeUndefined();
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.link).toBeTruthy();
  });

  describe('Suggest me button', () => {
    it('Shouldn`t display button if there is no parameters', () => {
      let button: HTMLElement =
        compiled.nativeElement.querySelector('.card__suggest');
      component.movieProps = {} as IMovie;
      fixture.detectChanges();
      expect(button).toBeNull();
    });

    it('Should display suggest button if component.movieProps.isManualSuggestion false', () => {
      component.isSuggest = true;
      component.movieProps = {
        type: 'movie',
        id: 1,
        isManualSuggestion: false,
      } as IMovie;
      fixture.detectChanges();
      let button: HTMLElement = fixture.debugElement.query(
        By.css('.card__suggest')
      ).nativeElement;
      // let button: HTMLElement =
      //   compiled.nativeElement.querySelector('.card__suggest');
      // let matIcon = button.children[0];
      // expect(matIcon.textContent).toContain('thumb_up');
      expect(button.classList).not.toContain('isSuggested');
      expect(button.textContent).toContain('Suggest me');
    });

    it('Should display suggest button with suggest data if component.movieProps.isManualSuggestion true', () => {
      component.isSuggest = true;
      component.movieProps = {
        isManualSuggestion: true,
      } as IMovie;
      fixture.detectChanges();
      let button: HTMLElement =
        compiled.nativeElement.querySelector('.card__suggest');

      let matIcon = button.children[0];

      expect(matIcon.textContent).toContain('check_circle');
      expect(button.classList).toContain('isSuggested');
      expect(button.textContent).toContain('Already suggested');
    });
  });
  describe('Add to list button', () => {
    it('Shouldn`t display button if there is no parameters', () => {
      let button: HTMLElement =
        compiled.nativeElement.querySelector('.card__suggest');
      component.movieProps = {} as IMovie;
      fixture.detectChanges();
      expect(button).toBeNull();
    });

    it('Should display add to list button if component.isAddToList and component.movieProps.isAdded true', () => {
      component.isAddToList = true;
      component.movieProps = {
        isAdded: true,
      } as IMovie;
      fixture.detectChanges();
      let button: HTMLElement =
        compiled.nativeElement.querySelector('.card__suggest');
      let matIcon = button.children[0];

      expect(matIcon.textContent).toContain('close');
      expect(button.textContent).toContain('Remove from list');

      component.movieProps = {
        isAdded: false,
      } as IMovie;
      fixture.detectChanges();

      expect(matIcon.textContent).toContain('add');
      expect(button.textContent).toContain('Add to my list');
    });

    it('Should display add to list button if component.isAddToList true and component.movieProps.isAdded false ', () => {
      component.isAddToList = true;
      component.movieProps = {
        isAdded: false,
      } as IMovie;
      fixture.detectChanges();
      let button: HTMLElement =
        compiled.nativeElement.querySelector('.card__suggest');
      let matIcon = button.children[0];

      expect(matIcon.textContent).toContain('add');
      expect(button.textContent).toContain('Add to my list');
    });
  });

  describe('routerLink', () => {
    it('should have a link to /movieProps.type/movieProps.id', () => {
      component.movieProps = {
        type: 'movie',
        id: 228,
      } as IMovie;
      component.ngOnInit();
      fixture.detectChanges();

      expect(component.link).toContain(
        `/${component.movieProps.type}/${component.movieProps.id}`
      );
    });
  });
});
