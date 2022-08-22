import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  displayError: boolean = false;
  loginForm: FormGroup;
  error = null;

  constructor(private formBuilder: FormBuilder, private api: ApiService,
    private router: Router, private route: ActivatedRoute) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {

  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      // 1. Get a request token by /authentication/token/new. This will give a request token.
      this.api.authenticationStep1().subscribe({
        next: (data) => (
          // 2. Validate the username and password for your account by making POST call /authentication/token/validate_with_login with username, password, and request token
          this.authenticationStep2(form.value.username, form.value.password, data.request_token),

          // 3. With the request token received in the 2nd step, call this POST API /authentication/session/new to get the session id.
          this.authenticationStep3(data.request_token)
        ),
      });
    }
  }

  authenticationStep2(username: string, password: string, token: string) {
    this.api.authenticationStep2(username, password, token).subscribe({
      error: (err) => (this.error = err.message, this.displayError = true),
      complete: () => (this.error = null),
    });
  }

  authenticationStep3(token: string) {
    this.api.authenticationStep3(token).subscribe({
      next: (data) => (this.api.saveSessionId(data.session_id)),
      error: (err) => (this.error = err.message, this.displayError = true),
      complete: () => this.router.navigateByUrl("/home"),
    });
  }
}
