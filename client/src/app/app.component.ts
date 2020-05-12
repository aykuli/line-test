import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  closeResult: string;

  constructor(public authService: AuthService) { }

}
