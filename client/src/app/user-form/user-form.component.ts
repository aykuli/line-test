import { Component, OnInit } from '@angular/core';
import User from '../../../src/models/user'

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  public user: User;
  public isFormSubmitted: boolean;

  constructor() { }

  ngOnInit(): void {
    this.isFormSubmitted = false;
    this.user = {
      id: 1,
      email: '',
      password: ''
    }
  }


  public cleanBtnClicked() {
    this.user = new User()
  }

  public handleSubmit() {
    this.isFormSubmitted = true;


  }

}
