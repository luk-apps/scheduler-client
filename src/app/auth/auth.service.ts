import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppUser } from '../models/app-user';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router'; 
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = environment.apiUrl;
  public currentUser: Observable<AppUser>;
  private currentUserSubject: BehaviorSubject<AppUser>;

  constructor(public http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<AppUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

  login(username: string, password: string) {
    return this.http.post<any>(this.url + '/login', { username: username, password: password }).pipe(
      tap(res => {
        this.setSession(res);
        this.currentUserSubject.next(res);
      })
    );
  }

  public get currentUserValue(): AppUser {
    return this.currentUserSubject.value;
}

  private setSession(authResult) {
    localStorage.setItem('currentUser', JSON.stringify(authResult));
  }

  public logout() {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
    this.router.navigateByUrl('login');
  }
}