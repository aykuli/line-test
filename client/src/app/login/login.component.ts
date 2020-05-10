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
export class LoginComponent implements OnInit {
  email = ''
  password = ''

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.email, this.password)
  }
}
