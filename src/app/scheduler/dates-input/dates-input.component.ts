import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, rangesEqual } from '@fullcalendar/angular';
import { TimeFrame } from 'src/app/models/time-frame';
import { ConfirmService } from '../services/confirm.service';
import { DateTimeService } from '../services/date-time.service';

@Component({
  selector: 'app-dates-input',
  templateUrl: './dates-input.component.html',
  styleUrls: ['./dates-input.component.css']
})
export class DatesInputComponent implements OnInit {

  constructor(private confirmService: ConfirmService,
    private dateTimeService: DateTimeService) { }

  ngOnInit(): void {
    if (this.inputTimeFrames) {
      this.setInitialTimeFrames(this.inputTimeFrames);
    }
  }

  @Output() addTimeFrameEvent = new EventEmitter<TimeFrame>();
  @Input() inputTimeFrames: any;

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'timeGridWeek',
    initialDate: new Date(),
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    events: []
  };
  currentEvents: EventApi[] = [];

  setInitialTimeFrames(events: any) {
    var items = []
    events.forEach(element => {
      items.push({
        start: element.start,
        end: element.end
      });
    });
    this.calendarOptions.events = items;
  }

  setEvents(results: any) {
    var items = []
    results.eventsTimeFrames.forEach(element => {
      items.push({
        id: element.eventData.name,
        title: element.eventData.name,
        start: element.startDate,
        end: element.endDate
      });
    });
    this.calendarOptions.events = items;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection
    let isOverlaping = this.isEventOverlaping(selectInfo);
    let isOneDayEvent = this.isOneDayEvent(selectInfo);
    // check if event is overlaping with the rest of events or multiple days
    if (!isOverlaping && isOneDayEvent) {
      calendarApi.addEvent({
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
      this.addTimeFrameEvent.emit(new TimeFrame(new Date(selectInfo.startStr), new Date(selectInfo.endStr)))
    }
    else {
      this.prepareRejectionDialog(isOverlaping, isOneDayEvent);
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  isEventOverlaping(selectInfo: DateSelectArg): boolean {
    let result = false;
    let events = selectInfo.view.calendar.getEvents();
  
    events.forEach(event => {
      let range = event._instance.range
      let start = this.dateTimeService.getLocalTime(range.start);
      let end = this.dateTimeService.getLocalTime(range.end);
      if(this.dateTimeService.doTimeFramesOverlap(selectInfo.start, selectInfo.end, start, end))
        result = true;
    });
    return result;
  }

  isOneDayEvent(range): boolean {
    return range.start.getFullYear() === range.start.getFullYear() &&
      range.start.getMonth() === range.end.getMonth() &&
      range.start.getDate() === range.end.getDate();
  }

  prepareRejectionDialog(isOverlaping, isOneDayEvent) {
    if(isOverlaping && isOneDayEvent) {
      this.confirmService.confirm('Attention', 'Time frames cannot overlap', 'Ok');
    }
    else if (!isOverlaping && !isOneDayEvent) {
      this.confirmService.confirm('Attention', 'Time frames cannot range multiple days', 'Ok');
    }
    else if (isOverlaping && !isOneDayEvent) {
      this.confirmService.confirm('Attention', 'Time frames cannot range multiple days and overlap with other ranges', 'Ok', null, 'lg');
    }
    else {
      this.confirmService.confirm('Attention', 'Unexpected error', 'Ok');
    }
  }
}
