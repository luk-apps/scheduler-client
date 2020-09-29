import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TimeFrame } from 'src/app/models/time-frame';
import { ScheduleParameters } from 'src/app/models/schedule-parameters';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  // temporary URL
  private url: string = `${environment.apiUrl}/schedule/`;

  constructor(
    private http: HttpClient
  ) { }

  generateSchedule(scheduleParameters: ScheduleParameters) {
    console.log(scheduleParameters);
    return this.http.post<any>(this.url + "generate", scheduleParameters);
  }
}
