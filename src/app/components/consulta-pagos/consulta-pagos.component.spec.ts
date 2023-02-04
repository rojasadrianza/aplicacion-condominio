import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaPagosComponent } from './consulta-pagos.component';

describe('ConsultaPagosComponent', () => {
  let component: ConsultaPagosComponent;
  let fixture: ComponentFixture<ConsultaPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaPagosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
