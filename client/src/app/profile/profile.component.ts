import { Component, OnInit } from '@angular/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap'

import constantas from '../../assets/contstantas'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [NgbProgressbarConfig]
})
export class ProfileComponent implements OnInit {
  isStartTest = false;
  progressValue = 0;
  timeRemain = constantas.TEST_TIME_MAX;
  isEndTest = false;
  impulseCount = 0;
  intervalId: any;

  constructor(config: NgbProgressbarConfig) {
    config.max = constantas.TEST_TIME_MAX;
    config.striped = true;
    config.animated = true;
    config.type = 'success';
    config.height = '20px';
  }

  ngOnInit(): void {
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
  }

  async testing() {
    let curr = this.progressValue

    this.intervalId = setInterval(() => {
      if (curr > constantas.TEST_TIME_MAX) {
        clearInterval(this.intervalId)
      } else if (curr === constantas.TEST_TIME_MAX) {
        setTimeout(() => {
          this.isEndTest = true;
        }, 1000)
        return;
      }
      this.progressValue = curr++
      this.timeRemain = Math.floor((constantas.TEST_TIME_MAX - this.progressValue) / 10)
    }, 100)

    // show impulses count on page
    this.randomImpulses()
  }

}
