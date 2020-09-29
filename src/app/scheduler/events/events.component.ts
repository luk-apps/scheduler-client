import { Component, OnInit } from '@angular/core';
import { Participant } from 'src/app/models/participant';
import { Event } from 'src/app/models/event';
import { ScheduleService } from '../services/schedule.service';
import { EventService } from '../services/event.service';
import { ParticipantService } from '../services/participant.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ParticipantChecked } from 'src/app/models/participant-checked';
import { ConfirmService } from '../services/confirm.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  public eventName: String;
  public durationInMinutes: number;
  public events: Event[] = [];
  public participants: Participant[] = [];
  public allSelected: boolean = false;
  public checkList: ParticipantChecked[] = [];
  public closeResult: string;
  public eventsLoaded: boolean = false;

  constructor(public scheduleService: ScheduleService,
    public eventService: EventService,
    public participantService: ParticipantService,
    private modalService: NgbModal,
    private confirmService: ConfirmService) { }

  ngOnInit(): void {
    this.getParticipants();
    this.getEvents();
  }

  createEvent(): void {
    var selected = [];
    this.checkList.filter(p => p.checked).forEach(p => selected.push(p.participant));
    this.eventService.addEvent(new Event(this.eventName, this.durationInMinutes, selected))
      .subscribe(event => {
        this.events.push(event)
        this.clearParams();
      });
  }

  clearParams() {
    this.allSelected = false;
    this.checkList.forEach(p => p.checked = false);
    this.eventName = null;
    this.durationInMinutes = null;
  }

  delete(event: Event) {
    this.confirmService.confirm('Confirm', 'Are you sure you want to delete this event?', 'Yes', 'Cancel')
      .then((confirmed) => {
        if (confirmed) {
          this.eventService.deleteEvent(event).subscribe(() => {
            const index = this.events.indexOf(event, 0);
            if (index > -1) {
              this.events.splice(index, 1);
            }
          });
        }
      })
      .catch(() => { });
  }

  deleteAll() {
    if (this.events.length == 0)
      this.confirmService.confirm('Attention', 'There are no events yet', 'Ok');

    else
    this.confirmService.confirm('Confirm', 'Are you sure you want to delete all events?', 'Yes', 'Cancel')
      .then((confirmed) => {
        if (confirmed) {
          this.eventService.deleteAllEvents().subscribe(() => {
            this.events = [];
          });
        }
      })
      .catch(() => { });
  }

  getParticipants(): void {
    this.participantService.getParticipants()
      .subscribe(participants => {
        if (participants)
          this.participants = participants;
        this.participants.forEach(p => this.checkList.push({ participant: p, checked: false }))
      });
  }

  getEvents(): void {
    this.eventService.getEvents()
      .subscribe(events => {
        this.eventsLoaded = true;
        if (events)
          this.events = events
      });
  }

  saveButtonDisabled(): boolean {
    return !this.durationInMinutes || !this.eventName || this.checkList.filter(p => p.checked == true).length == 0;
  }

  checkAllParticipants() {
    if (this.allSelected) {
      this.checkList.forEach(p => p.checked = true);
    }
    else {
      this.checkList.forEach(p => p.checked = false);
    }
  }

  open(content) {
    if(this.participants.length == 0) {
      this.confirmService.confirm('Attention', 'You cannot create event when there are no participants created. Go back to the previous step and add participants.', 'Ok')
      .then(() => {
      })
    .catch(() => { });
    }
    else {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'md' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



}
