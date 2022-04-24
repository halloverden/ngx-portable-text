import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderCustomComponentComponent } from './render-custom-component.component';

describe('RenderCustomComponentComponent', () => {
  let component: RenderCustomComponentComponent;
  let fixture: ComponentFixture<RenderCustomComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderCustomComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderCustomComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
