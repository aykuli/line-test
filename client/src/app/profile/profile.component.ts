import { Component, OnInit } from '@angular/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap'
import { AuthService } from '../auth.service'

import constantas from '../../assets/contstantas'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [NgbProgressbarConfig]
})
export class ProfileComponent implements OnInit {
  allData = this.authService.dataSource.getValue();
  isEmptyData = this.authService.isEmptyData(this.allData)

  isStartTest = this.isEmptyData ? false : this.allData.isStartTest;
  progressValue = this.isEmptyData ? 0 : this.allData.progressValue;
  timeRemain = this.isEmptyData ? constantas.TEST_TIME_MAX : this.allData.timeRemain;
  isEndTest = this.isEmptyData ? false : this.allData.isEndTest;
  impulseCount = this.isEmptyData ? 0 : this.allData.impulseCount;
  intervalId: any;

  constructor(config: NgbProgressbarConfig, public authService: AuthService) {
    config.max = constantas.TEST_TIME_MAX;
    config.striped = true;
    config.animated = true;
    config.type = 'success';
    config.height = '20px';
  }

  ngOnInit(): void {
    const data = this.authService.dataSource.getValue();
    if (data.isStartTest) {
      this.handleStartTest()
    }
  }

  randomImpulses() {
    const min = constantas.MIN_IMPULSES;
    const max = constantas.MAX_IMPULSES;

    let rand = Math.floor(min + Math.random() * (max + 1 - min));
    if ([1007, 1009].includes(rand)) {
      this.randomImpulses()
    } else {
      this.impulseCount = rand;
    }
  }

  handleStartTest() {
    this.isStartTest = true
    this.testing()
  }

  handleClearTest() {
    this.isEndTest = false;
    this.isStartTest = false;
    this.progressValue = 0;
    this.timeRemain = constantas.TEST_TIME_MAX;
    this.impulseCount = 0;
    clearInterval(this.intervalId)

    this.authService.dataSource.next({
      isStartTest: this.isStartTest,
      progressValue: this.progressValue,
      timeRemain: this.timeRemain,
      isEndTest: this.isEndTest,
      impulseCount: this.impulseCount
    })
  }

  async testing() {
    let curr = this.progressValue

    this.intervalId = setInterval(() => {

      // execute if only user is logged in
      if (!this.authService.isloggedOut.getValue().isloggedOut) {
        if (curr > constantas.TEST_TIME_MAX - 1) {
          clearInterval(this.intervalId)

        } else if (curr === constantas.TEST_TIME_MAX - 1 && !this.isEndTest) {
          // show impulses count on page
          this.randomImpulses()
          this.isEndTest = true;
          return;
        }

        this.progressValue = curr++
        this.timeRemain = Math.floor((constantas.TEST_TIME_MAX - this.progressValue) / 10)

        // send data toauthService to send it to server
        this.authService.dataSource.next({
          isStartTest: this.isStartTest,
          progressValue: this.progressValue,
          timeRemain: this.timeRemain,
          isEndTest: this.isEndTest,
          impulseCount: this.impulseCount
        })
      }

    }, 100)

  }

}
