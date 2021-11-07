import { TestBed } from '@angular/core/testing';

import { DataFormResolver } from './data-form.resolver';

describe('DataFormResolver', () => {
  let resolver: DataFormResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DataFormResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
