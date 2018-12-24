import { TestBed, inject } from '@angular/core/testing';

import { PartyNewsService } from './partyNews.service';
import { HttpClient } from '@angular/common/http';
import { ShareModule } from '../share.module';

describe('PartyNewsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartyNewsService, HttpClient],
      imports: [
        ShareModule
      ]
    });
  });

  it('should be created', inject([PartyNewsService], (service: PartyNewsService) => {
    expect(service).toBeTruthy();
  }));
});
