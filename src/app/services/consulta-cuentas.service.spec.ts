import { TestBed } from '@angular/core/testing';

import { ConsultaCuentasService } from './consulta-cuentas.service';

describe('ConsultaCuentasService', () => {
  let service: ConsultaCuentasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaCuentasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
