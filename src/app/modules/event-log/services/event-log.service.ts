import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../model/events.model';

@Injectable({
  providedIn: 'root'
})
export class EventLogService {

  constructor(private http: HttpClient) { }

  configUrl = 'http://localhost:3000/data';

  getEventLogs(): Observable<Event[]> {
    return this.http.get<Event[]>(this.configUrl);
  }
}
