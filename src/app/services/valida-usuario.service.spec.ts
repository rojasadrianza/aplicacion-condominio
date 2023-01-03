import { TestBed } from '@angular/core/testing';

import { ValidaUsuarioService } from './valida-usuario.service';

describe('ValidaUsuarioService', () => {
  let service: ValidaUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidaUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
