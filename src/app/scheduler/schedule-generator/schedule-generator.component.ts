import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../services/schedule.service';
import { TimeFrame } from 'src/app/models/time-frame';
import { ScheduleParameters } from 'src/app/models/schedule-parameters';
import { ResultsService } from '../services/results.service';
import { Router } from '@angular/router';
import { ErrorMessageService } from '../services/error-message.service';
import { ConfirmService } from '../services/confirm.service';

@Component({
  selector: 'app-schedule-generator',
  templateUrl: './schedule-generator.component.html',
  styleUrls: ['./schedule-generator.component.css']
})
export class ScheduleGeneratorComponent implements OnInit {

  public scheduleParameters: ScheduleParameters;
  closeResult: string;
  performanceTimeStart;
  performanceTimeEnd;
  loading: boolean = false;

  constructor(private scheduleService: ScheduleService,
    private resultServcie: ResultsService,
    private router: Router,
    private errorMessageService: ErrorMessageService,
    private confirmService: ConfirmService) { }

  ngOnInit(): void {
    this.scheduleParameters = new ScheduleParameters();
    this.scheduleParameters.useLimitedTimeFrames = false;
  }

  generateSchedule(): void {
    this.performanceTimeStart = performance.now();
    this.loading = true;
    this.scheduleService.generateSchedule(this.scheduleParameters).subscribe(res => {
      this.loading = false;
      if (res.length == 0)
        this.noResultsFoundDialog();
      else if (res.length >= 1) {
        this.performanceTimeEnd = performance.now();
        this.continueWithResults(res);
      }
    },
      errorResponse => {
        this.loading = false;
        let errorMessage = this.errorMessageService.prepareErrorMessage(errorResponse.error.exceptionCode, errorResponse.error.details);
        this.confirmService.confirm('Error', errorMessage, 'Ok', null, 'lg');
      });
  }

  noResultsFoundDialog() {
    let message = "Unfortunately the algorithm has not found any results for provided parameters. Rearrange users availabilities and try again."
    if(this.scheduleParameters.useLimitedTimeFrames)
      message = message.concat('\n' + "The events also could not fit provided limited time range");
    this.confirmService.confirm(':(', message,
      'Ok', null, 'lg');
  }

  continueWithResults(res) {
    let time = (this.performanceTimeEnd - this.performanceTimeStart) / 1000;
    this.confirmService.confirm('Success', `The algorithm has found ${res.length} unique results in ${time} seconds. The results are sorted by the time all events take in summary.
      Click continue to see the result.`,
      'Continue', null, 'lg')
      .then((confirmed) => {
        if (confirmed) {
          this.setResults(res);
        }
      })
      .catch(() => this.setResults(res));
  }

  setResults(res) {
    this.resultServcie.setResult(res);
    this.router.navigateByUrl('scheduler/results');
  }

  receiveAddTimeFrameEvent($event) {
    this.scheduleParameters.timeFrames.push(new TimeFrame($event.start, $event.end));
  }

  generateButtonDisabled(): boolean {
    return this.loading || !this.scheduleParameters.timeStep || !this.scheduleParameters.numberOfRooms || !this.scheduleParameters.maxNumberOfResults ||
      (this.scheduleParameters.timeFrames.length == 0 && this.scheduleParameters.useLimitedTimeFrames);
  }

  toggleLimitedTimeFrames() {
    if (!this.scheduleParameters.useLimitedTimeFrames) {
      this.scheduleParameters.timeFrames = [];
    }
  }
}
