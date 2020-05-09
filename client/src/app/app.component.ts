import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import User from '../models/user'

import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userFromTmp = {};
  title = 'client';
  isAuth: boolean = false;

  constructor(private user: UserService) { }

  ngOnInit() {
    this.userFromTmp = this.user.getUser()
  }
}
