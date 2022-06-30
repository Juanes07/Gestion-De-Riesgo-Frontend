import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCrearRiesgoComponent } from './form-crear-riesgo.component';

describe('FormCrearRiesgoComponent', () => {
  let component: FormCrearRiesgoComponent;
  let fixture: ComponentFixture<FormCrearRiesgoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCrearRiesgoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCrearRiesgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
