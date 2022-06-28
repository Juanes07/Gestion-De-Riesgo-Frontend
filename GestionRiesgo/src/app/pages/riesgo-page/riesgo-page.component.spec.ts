import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiesgoPageComponent } from './riesgo-page.component';

describe('RiesgoPageComponent', () => {
  let component: RiesgoPageComponent;
  let fixture: ComponentFixture<RiesgoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiesgoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiesgoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
