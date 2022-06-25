import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCrearProyectoComponent } from './form-crear-proyecto.component';

describe('FormCrearProyectoComponent', () => {
  let component: FormCrearProyectoComponent;
  let fixture: ComponentFixture<FormCrearProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCrearProyectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCrearProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
