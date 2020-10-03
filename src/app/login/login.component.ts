import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  authenticationFailed: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) { 
      if(this.authService.currentUserValue) {
        this.router.navigateByUrl('scheduler/start');
      }
      this.form = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      });
    }

  ngOnInit(): void { }

  login() {
    const val = this.form.value;
      if (val.username && val.password) {
          this.authService.login(val.username, val.password)
          .subscribe(
            (res) => {
              this.router.navigateByUrl('scheduler/start');
            },
            () => {
              this.authenticationFailed = true;
            }
          );
      }
  }

}
