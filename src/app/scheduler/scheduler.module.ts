import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleGeneratorComponent } from './schedule-generator/schedule-generator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EventsComponent } from './events/events.component';
import { ParticipantsComponent } from './participants/participants.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StartComponent } from './start/start.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { SchedulerComponent } from './scheduler/scheduler.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { ResultsComponent } from './results/results.component';
import { DatesInputComponent } from './dates-input/dates-input.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EventDetailsComponent } from './event-details/event-details.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
])


@NgModule({
  declarations: [ScheduleGeneratorComponent, ScheduleGeneratorComponent, EventsComponent, ParticipantsComponent, StartComponent, SchedulerComponent, ResultsComponent, DatesInputComponent, ConfirmComponent, EventDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    FullCalendarModule, // moduł kalendarza - jest zaimportowany tylko do schdule module. czy nie powinien być do głównego modułu apki?
    MatIconModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ]
})
export class SchedulerModule { }
