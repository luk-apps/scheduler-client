import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleGeneratorComponent } from './scheduler/schedule-generator/schedule-generator.component';
import { EventsComponent } from './scheduler/events/events.component';
import { ParticipantsComponent } from './scheduler/participants/participants.component';
import { StartComponent } from './scheduler/start/start.component';
import { SchedulerComponent } from './scheduler/scheduler/scheduler.component';
import { LoginComponent } from './login/login.component';
import { ResultsComponent } from './scheduler/results/results.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'scheduler', component: SchedulerComponent, canActivate: [AuthGuard], children: [
      { path: 'start', component: StartComponent },
      { path: 'participants', component: ParticipantsComponent },
      { path: 'events', component: EventsComponent },
      { path: 'generate_schedule', component: ScheduleGeneratorComponent },
      { path: 'results', component: ResultsComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
