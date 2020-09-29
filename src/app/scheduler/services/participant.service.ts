import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Participant } from 'src/app/models/participant';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  private url: string = `${environment.apiUrl}/person/`;

  constructor(private http: HttpClient) { }

  addParticipant(participant: Participant): Observable<Participant> {
    return this.http.post<Participant>(this.url + "persons", participant).pipe(
      catchError(this.handleError<Participant>('addParticipant'))
    );
  }

  updateParticipant(participant: Participant): Observable<Participant> {
    const url = `${this.url}update/${participant.id}`;
    return this.http.put<Participant>(url, participant)
      .pipe(
        catchError(this.handleError<any>('getParticipant'))
      );
  }

  deleteParticipant(participant: Participant): Observable<{}> {
    const url = `${this.url}${participant.id}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError('deleteParticipant'))
      );
  }

  deleteAll(): Observable<{}> {
    return this.http.delete(`${this.url}delete_all`).pipe(
        catchError(this.handleError('deleteAllParticipants'))
    );
  }

  getParticipants(): Observable<Participant[]> {
    return this.http.get<Participant[]>(this.url + "persons")
      .pipe(
        catchError(this.handleError<Participant[]>('getParticipants', []))
      );
  }

  getParticipant(participant: any): Observable<any> {
    const url = `${this.url}details/${participant.id}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError<any>('getParticipant'))
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
