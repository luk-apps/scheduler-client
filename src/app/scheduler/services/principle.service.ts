import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Participant } from 'src/app/models/participant';
import { Principle } from 'src/app/models/principle';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrincipleService {

  // temporary URL
  private url: string = "http://localhost:8081/principle/";

  constructor(public http: HttpClient) { }

  addPrinciple(principle: Principle) {
    return this.http.post<any>(this.url + "principles", principle);
  }

  addPrinciples(principles: Principle[]) {
    return this.http.post<any>(this.url + "multiple_principles", principles)
  }

  updatePrinciplesByPerson(participant: Participant, principles: Principle[]) {
    return this.http.put<any>(this.url + `update_by_person/${participant.id}`, principles)
  }

  getPrinciples(): Observable<Principle[]> {
    return this.http.get<Principle[]>(this.url + "principles")
      .pipe(
        catchError(this.handleError<Principle[]>('getPrinciples', []))
      );
  }

  deletePrinciple(principle: Principle): Observable<{}> {
    const url = `${this.url}${principle.id}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError('deletePrinciple'))
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
