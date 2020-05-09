import { Component } from '@angular/core';
import { AuthService } from './auth.service';

export interface User {
  email: string
  password: string
  id: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService]
})
export class AppComponent {
  title = 'client';
  public user: User = {
    email: '',
    password: '',
    id: ''
  }

  constructor(public authService: AuthService) { }

  ngOnInit() { }

}
