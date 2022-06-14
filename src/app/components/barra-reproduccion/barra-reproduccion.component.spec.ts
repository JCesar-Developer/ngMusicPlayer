import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraReproduccionComponent } from './barra-reproduccion.component';

describe('BarraReproduccionComponent', () => {
  let component: BarraReproduccionComponent;
  let fixture: ComponentFixture<BarraReproduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarraReproduccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraReproduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
