import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {Router, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, RouterOutlet]
})
export class LoginComponent {

loginForm = this.fb.group({
  username: ['', [Validators.required, Validators.email]],
  password: ['', Validators.required]
})

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router) {
  }

  submit() {
    this.loginService.login(
      this.loginForm.controls.username!.value!,
      this.loginForm.controls.password!.value!)
      .subscribe(token => {
        if (token){
          sessionStorage.setItem('token', token)
          this.router.navigate(['']);
        }
        else {
          console.log("error with token");
        }
      })
  }
}
