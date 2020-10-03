import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EventDetailsComponent } from '../event-details/event-details.component';
import { Participant } from '../../models/participant';

@Injectable({
  providedIn: 'root'
})
export class EventDetailsService {

  constructor(private modalService: NgbModal) { }

  public show(
    eventTitle: string,
    duration: number,
    participants: Participant[],
  ): Promise<boolean> {
    const modalRef = this.modalService.open(EventDetailsComponent, { size: 'md' });

    modalRef.componentInstance.eventTitle = eventTitle;
    modalRef.componentInstance.duration = duration;
    modalRef.componentInstance.participants = participants;

    return modalRef.result;
  }
}
