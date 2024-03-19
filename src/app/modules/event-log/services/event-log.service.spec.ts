import { TestBed } from '@angular/core/testing';

import { EventLogService } from './event-log.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('EventLogService', () => {
  let service: EventLogService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  const mockEvents =
    [
      {
        "timestamp": "2021-08-01T12:00:00.000Z",
        "level": "WARNING",
        "message": "Metric 1 is above the warning threshold"
      },
      {
        "timestamp": "2021-08-01T13:00:00.000Z",
        "level": "ERROR",
        "message": "Metric 1 is above the error threshold"
      },
      {
        "timestamp": "2021-08-01T14:00:00.000Z",
        "level": "INFO",
        "message": "Metric 1 is back to normal"
      },
      {
        "timestamp": "2021-08-02T12:00:00.000Z",
        "level": "INFO",
        "message": "Telemetry downloaded"
      },
      {
        "timestamp": "2021-08-02T12:01:00.000Z",
        "level": "INFO",
        "message": "Telemetry downloaded"
      },
      {
        "timestamp": "2021-08-02T12:02:00.000Z",
        "level": "INFO",
        "message": "Telemetry downloaded"
      },
      {
        "timestamp": "2021-08-02T12:03:00.000Z",
        "level": "INFO",
        "message": "Telemetry downloaded"
      }
    ];


  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        EventLogService,
        {
          provide: HttpClient,
          useValue: httpClientSpyObj
        }
      ]
    });
    service = TestBed.inject(EventLogService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return users', () => {
    httpClientSpy.get.and.returnValue(of(mockEvents)); 
    service.getEventLogs().subscribe((data) => { 
      expect(data).toEqual(mockEvents);
    });
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });
});
