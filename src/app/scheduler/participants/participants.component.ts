import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Participant } from '../../models/participant';
import { ParticipantService } from '../services/participant.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Principle } from 'src/app/models/principle';
import { TimeFrame } from 'src/app/models/time-frame';
import { switchMap } from 'rxjs/operators';
import { PrincipleService } from '../services/principle.service';
import { ConfirmService } from '../services/confirm.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {

  public firstName: String;
  public lastName: String;
  public selectedParticipant: Participant;
  participantsLoaded: boolean = false;
  participants: Participant[] = [];
  public selectedTimeFrames: TimeFrame[] = [];
  principles: Principle[] = [];
  closeResult: string;

  @ViewChild('personModal') personModal: ElementRef;
  @ViewChild('confirmModal') confirmModal: ElementRef;

  constructor(public participantService: ParticipantService,
    private modalService: NgbModal,
    private principleService: PrincipleService,
    private confirmService: ConfirmService) {
  }

  ngOnInit(): void {
    this.getParticipants();
  }

  deleteParticipant(participant: Participant) {
    this.confirmService.confirm('Are you sure?', 'Deleting this participant will cause deletion of all associated principles. All events where only that person participates will also be deleted.',
      'OK', 'Cancel', 'lg')
      .then((confirmed) => {
        if (confirmed) {
          this.participantService.deleteParticipant(participant).subscribe(() => {
            const index = this.participants.indexOf(participant, 0);
            if (index > -1) {
              this.participants.splice(index, 1);
            }
            this.resetParams();
          });
        }
      })
      .catch(() => { });
  }

  showDetails(participant: Participant) {
    this.participantService.getParticipant(participant).subscribe((res) => {
      this.firstName = res.person.firstName;
      this.lastName = res.person.lastName;
      this.selectedParticipant = participant;
      res.principles.forEach(p => this.selectedTimeFrames.push(new TimeFrame(p.startDate, p.endDate)))
      this.open(this.personModal);
    });
  }

  getParticipants(): void {
    this.participantService.getParticipants()
      .subscribe(participants => {
        this.participantsLoaded = true;
        if (participants)
          this.participants = participants;
      });
  }

  receiveAddTimeFrameEvent($event) {
    this.selectedTimeFrames.push(new TimeFrame($event.start, $event.end));
  }

  save() {
    this.firstName = this.firstName.trim();
    this.lastName = this.lastName.trim();
    if (this.selectedParticipant) {
      this.updateParticipant(this.selectedParticipant);
    }
    else {
      this.createParticipant();
    }
  }

  updateParticipant(participant: Participant) {
    participant.firstName = this.firstName;
    participant.lastName = this.lastName;
    if (!this.firstName || !this.lastName) { return; }
    this.participantService.updateParticipant(participant)
      .pipe(
        switchMap(participant => {
          this.selectedTimeFrames.forEach(timeFrame =>
            this.principles.push(new Principle(participant, timeFrame.start, timeFrame.end))
          )
          return this.principleService.updatePrinciplesByPerson(participant, this.principles);
        })
      ).subscribe(() => {
        var found = this.participants.find(p => p.id == this.selectedParticipant.id);
        found.firstName = this.firstName;
        found.lastName = this.lastName;
        this.resetParams();
      })
  }

  createParticipant() {
    if (!this.firstName || !this.lastName) { return; }
    this.participantService.addParticipant(new Participant(this.firstName, this.lastName))
      .pipe(
        switchMap(participant => {
          this.selectedTimeFrames.forEach(timeFrame =>
            this.principles.push(new Principle(participant, timeFrame.start, timeFrame.end))
          )
          return this.principleService.addPrinciples(this.principles)
        })
      ).subscribe(response => {
        this.participants.push(response[0].participant);
        this.resetParams();
      });
  }

  removeAllParticipants() {
    if (this.participants.length == 0)
      this.confirmService.confirm('Attention', 'There are no participants yet', 'Ok');

    else
      this.confirmService.confirm('Are you sure?', 'All associated events will be deleted', 'Yes', 'Cancel')
        .then((confirmed) => {
          if (confirmed) {
            this.participantService.deleteAll().subscribe(res => {
              this.participants = [];
            });
          }
        })
        .catch(() => { });
  }

  saveButtonDisabled() {
    if (!this.firstName || !this.lastName)
      return true;
    else return false;
  }

  toggleCheckAll() {
    console.log("toggle check all");
  }

  resetParams() {
    this.firstName = "";
    this.lastName = "";
    this.principles = [];
    this.selectedTimeFrames = [];
    this.selectedParticipant = null;
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.resetParams();
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

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
