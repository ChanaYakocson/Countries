import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { CountriesService } from './countries.service';

describe('CountriesService', () => {
  let service: CountriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [
      
      HttpClientModule
    ],});
    service = TestBed.inject(CountriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
