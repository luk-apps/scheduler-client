import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { AppUser } from 'src/app/models/app-user';
import { StagesService } from '../services/stages.service';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {

  constructor(private authService: AuthService, 
    private router: Router,
    private stagesService: StagesService) { }

  loggedInUser: string;

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('currentUser')).Username;
  }

  logout() {
    this.authService.logout();
  }

  previousButtonVisible() {
    return !this.stagesService.isFirstStage(this.router.url);
  }

  nextButtonVisible() {
    return !this.stagesService.isLastStage(this.router.url);
  }

  goToNextStage() {
    this.router.navigateByUrl(this.stagesService.getNextStage(this.router.url));
  }

  goToPrevStage() {
    this.router.navigateByUrl(this.stagesService.getPrevStage(this.router.url));
  }

}
