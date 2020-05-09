import { Component, OnInit } from '@angular/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap'

const TEST_TIME_MAX = 300;
const MAX_IMPULSES = 1010;
const MIN_IMPULSES = 1002
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [NgbProgressbarConfig]
})
export class ProfileComponent implements OnInit {
  isStartTest = false;
  progressValue = 0;
  timeRemain = TEST_TIME_MAX;
  isEndTest = false;
  impulseCount = 0;
  intervalId

  constructor(config: NgbProgressbarConfig) {
    config.max = TEST_TIME_MAX;
    config.striped = true;
    config.animated = true;
    config.type = 'success';
    config.height = '20px';
  }

  ngOnInit(): void {
  }

  randomImpulses() {
    const min = MIN_IMPULSES;
    const max = MAX_IMPULSES;

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
    this.timeRemain = TEST_TIME_MAX;
    this.impulseCount = 0;
    clearInterval(this.intervalId)
  }

  async testing() {
    let curr = this.progressValue

    this.intervalId = setInterval(() => {
      if (curr > TEST_TIME_MAX) {
        clearInterval(this.intervalId)
      } else if (curr === TEST_TIME_MAX) {
        setTimeout(() => {
          this.isEndTest = true;
        }, 1000)
        return;
      }
      this.progressValue = curr++
      this.timeRemain = Math.floor((TEST_TIME_MAX - this.progressValue) / 10)
    }, 100)

    // show impulses count on page
    this.randomImpulses()
  }

}
