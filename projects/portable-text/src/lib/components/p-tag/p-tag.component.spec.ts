import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PTagComponent } from './p-tag.component';

describe('PTagComponent', () => {
  let component: PTagComponent;
  let fixture: ComponentFixture<PTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
