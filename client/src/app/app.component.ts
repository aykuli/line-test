import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from './auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  closeResult: string;

  constructor(public authService: AuthService, private modalService: NgbModal) { }

}
