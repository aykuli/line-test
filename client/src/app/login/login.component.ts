import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'

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

  Login() {
    console.log('login in LoginComponent')
    this.authService.login(this.email, this.password)
  }
}
