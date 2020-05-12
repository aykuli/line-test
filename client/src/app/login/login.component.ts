import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { error } from 'protractor';

export interface DataWithToken {
  token: string
  userId: string
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = ''
  password = ''

  constructor(public authService: AuthService) { }

  login() {
    this.authService.login(this.email, this.password)
  }
}
