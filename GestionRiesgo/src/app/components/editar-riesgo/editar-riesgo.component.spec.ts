import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRiesgoComponent } from './editar-riesgo.component';

describe('EditarRiesgoComponent', () => {
  let component: EditarRiesgoComponent;
  let fixture: ComponentFixture<EditarRiesgoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarRiesgoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarRiesgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
