import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { ResultsService } from '../services/results.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  currentIndex: number = 0;
  totalNumberOfResults = 0;
  constructor(private resultsService: ResultsService) { }

  ngOnInit(): void {
    if(this.resultsService.getResults().length > 0) {
      console.log(this.resultsService.getResults());
      this.setEvents(this.resultsService.getResultOfIndex(this.currentIndex));
      this.totalNumberOfResults = this.resultsService.getNumberOfResults();
    }
  }

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'timeGridWeek',
    weekends: true,
    editable: false,
    selectable: false,
    selectMirror: true,
    dayMaxEvents: true,
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    events: [
      {
        id: 'b',
        title: 'All-day event',
        start: new Date()
      },
    ]
  };
  currentEvents: EventApi[] = [];

  addEvent() {
    this.calendarOptions.events = [].concat.apply([], [
      this.calendarOptions.events.valueOf(),
      {
        id: 'b',
        title: 'All-day event',
        start: new Date()
      },
    ]);

    // nadpisuje eventy
    // this.calendarOptions.events = [
    //   {
    //     id: 'b',
    //     title: 'All-day event',
    //     start: new Date()
    //   },
    // ]
  }

  setEvents(results: any) {
    var items = []
    console.log(results.totalTime);
    results.eventsTimeFrames.forEach(element => {
      items.push({
        id: element.event.name,
        title: element.event.name,
        start: element.start,
        end: element.end
      });
    });
    this.calendarOptions.events = items;
  }

  setPreviusResult() {
    if(this.currentIndex > 0) {
      this.currentIndex --;
      this.setEvents(this.resultsService.getResultOfIndex(this.currentIndex));
    }
  }

  setNextResult() {
    if(this.currentIndex < this.totalNumberOfResults - 1) {
      this.currentIndex ++;
      this.setEvents(this.resultsService.getResultOfIndex(this.currentIndex));
    }
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleEventClick(clickInfo: EventClickArg) {
    // TODO - display event data
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }




}
