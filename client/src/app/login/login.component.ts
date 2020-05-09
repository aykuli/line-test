import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { error } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = ''
  password = ''
  errorMsgs = [{ msg: '' }]

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    console.log('login in LoginComponent')
    this.authService.login(this.email, this.password).subscribe(data => {
      console.log('ligon data: ', data)
    },
      ({ error }) => {
        console.log('error: ', error.errors)
        this.errorMsgs = error.errors;
      })
  }
}
