import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestMeComponent } from './suggest-me.component';

describe('SuggestMeComponent', () => {
  let component: SuggestMeComponent;
  let fixture: ComponentFixture<SuggestMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestMeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
