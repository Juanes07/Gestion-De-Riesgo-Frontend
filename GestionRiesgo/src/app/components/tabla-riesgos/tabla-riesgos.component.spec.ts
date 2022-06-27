import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaRiesgosComponent } from './tabla-riesgos.component';

describe('TablaRiesgosComponent', () => {
  let component: TablaRiesgosComponent;
  let fixture: ComponentFixture<TablaRiesgosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaRiesgosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaRiesgosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
