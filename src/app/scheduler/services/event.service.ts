import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from 'src/app/models/event';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  // temporary URL
  private url: string = "http://localhost:8081/event/";

  constructor(private http: HttpClient) { }

  addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.url + "events", event).pipe(
      catchError(this.handleError<Event>('addEvent'))
    );
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.url + "events")
      .pipe(
        catchError(this.handleError<Event[]>('getEvents', []))
      );
  }

  deleteEvent(event: Event): Observable<{}> {
    const url = `${this.url}${event.id}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError('deleteEvent'))
      );
  }

  deleteAllEvents(): Observable<{}> {
    return this.http.delete(`${this.url}delete_all`)
      .pipe(
        catchError(this.handleError('deleteAllEvents'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
