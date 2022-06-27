import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiesgosPageComponent } from './riesgos-page.component';

describe('RiesgosPageComponent', () => {
  let component: RiesgosPageComponent;
  let fixture: ComponentFixture<RiesgosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiesgosPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiesgosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
