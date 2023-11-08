import { TestBed } from '@angular/core/testing';

import { AESencryptorService } from './aesencryptor.service';

describe('AESencryptorService', () => {
  let service: AESencryptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AESencryptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
