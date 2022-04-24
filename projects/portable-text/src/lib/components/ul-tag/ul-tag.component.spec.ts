import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UlTagComponent } from './ul-tag.component';

describe('UlTagComponent', () => {
  let component: UlTagComponent;
  let fixture: ComponentFixture<UlTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UlTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UlTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
