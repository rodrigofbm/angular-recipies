import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { AuthenticationResponse, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isSignin = false;
  isLoading = false;
  errorMessage = null;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    let sign$: Observable<AuthenticationResponse>;
    this.isLoading = true;

    if (!this.isSignin) {
      sign$ = this.authService.signUp(form.value.email, form.value.password);
    } else {
      sign$ = this.authService.signIn(form.value.email, form.value.password);
    }

    sign$.subscribe(
      () => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      }
    );

    this.errorMessage = null;
    form.reset();
  }

  onSwitchMode() {
    this.isSignin = !this.isSignin;
  }
}
