import { TestBed, inject } from '@angular/core/testing';

import { messageService } from './message.service';

describe('messageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [messageService]
    });
  });

  it('should be created', inject([messageService], (service: messageService) => {
    expect(service).toBeTruthy();
  }));
});
