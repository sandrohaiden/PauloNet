import { TestBed } from '@angular/core/testing';

import { InstalacaoService } from './instalacao.service';

describe('InstalacaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstalacaoService = TestBed.get(InstalacaoService);
    expect(service).toBeTruthy();
  });
});
