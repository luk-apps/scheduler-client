import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor() { }

  public getLocalTime(time): Date {
    var localOffset = time.getTimezoneOffset() * 60000;
    var localTime = time.getTime() + localOffset;
    let result = new Date();
    result.setTime(localTime);
    return result;
  }

  public doTimeFramesOverlap(start1: Date, end1: Date, start2: Date, end2: Date): boolean {
    let result = false;
    if(start1 > start2 && start1 < end2 || 
      end1 < end2 && end1 > start2 || 
      start1 < start2 && end1 > end2)
      result = true;
    return result;
  }
}
