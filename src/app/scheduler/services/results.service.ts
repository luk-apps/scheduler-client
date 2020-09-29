import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  results: any = [];

  constructor() { }

  setResult(results: any) {
    this.results = results;
  }

  addResult(result: any) {
    this.results.push(result)
  }

  getResults() {
    return this.results;
  }

  getNumberOfResults(): number {
    if(this.results)
      return this.results.length;
    else return 0;
  }

  getResultOfIndex(index: number) {
    return this.results[index];
  }

}
