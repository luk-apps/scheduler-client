import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  constructor() { }

  public prepareErrorMessage(errorCode: string, details: string) {
    // Temporary:
    if(errorCode == "IMPOSSIBLE_EVENT_TIME_FRAMES") {
      return `The algorithm found events that are impossible to organize: ${details}. The availability of participants in these events does not overlap`
    }
    else return "";
  }
}
