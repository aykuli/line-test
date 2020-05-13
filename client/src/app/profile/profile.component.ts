import { Component, OnInit } from '@angular/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap'
import { AuthService } from '../auth.service'

import constantas from '../../assets/constantas'
import { setTimeout } from 'timers';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [NgbProgressbarConfig]
})
export class ProfileComponent implements OnInit {
  allData = this.authService.dataSource.getValue();
  isEmptyData = this.authService.isEmptyData(this.allData)

  isStartTest = this.isEmptyData
    ? false
    : this.allData.isStartTest;
  progressValue = this.isEmptyData
    ? 0
    : this.allData.progressValue;
  timeRemain = this.isEmptyData
    ? constantas.TEST_TIME_MAX / 10
    : this.allData.timeRemain;
  isEndTest = this.isEmptyData
    ? false
    : this.allData.isEndTest;
  impulseCount = null;
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
    console.log('this.authService.dataSource.getValue() тпЩтштше: ', data);
    if (data.isStartTest) {
      this.handleStartTest()
    }

    window.addEventListener('beforeunload', () => {
      const dataToSend = {
        isStartTest: this.isStartTest,
        progressValue: this.progressValue,
        timeRemain: this.timeRemain,
        isEndTest: this.isEndTest,
        impulseCount: this.authService.impulses
      }
      this.authService.sendTestResult(dataToSend);
    });

    window.addEventListener('DOMContentLoaded', () => {
      console.log('зашли опять на страницу');
      this.authService.getPrevTestResults()
        .subscribe((data: any) => {
          console.log('data: ', data);
          if (data && data.isStartTest) {
            console.log('страница перезагружена ипродолжается тест')
            this.authService.dataSource.next(data)
            this.handleStartTest();
          }
        })
    });
  }

  handleStartTest() {
    this.isStartTest = true
    this.testing()
  }

  handleClearTest() {
    this.isEndTest = false;
    this.isStartTest = false;
    this.progressValue = 0;
    this.timeRemain = constantas.TEST_TIME_MAX / 10;
    this.impulseCount = null;
    clearInterval(this.intervalId)

    this.authService.dataSource.next({
      isStartTest: false,
      progressValue: 0,
      timeRemain: constantas.TEST_TIME_MAX / 10,
      isEndTest: false,
      impulseCount: null
    })
  }

  async testing() {
    console.log('this.authService.dataSource.getValue(): ', this.authService.dataSource.getValue())
    let curr = this.authService.dataSource.getValue().progressValue;

    this.intervalId = setInterval(() => {
      // execute if only user is logged in
      if (!this.authService.isLoggedOut.getValue().isLoggedOut) {
        if (curr > constantas.TEST_TIME_MAX - 1) {
          clearInterval(this.intervalId)

        } else if (curr === constantas.TEST_TIME_MAX - 1 && !this.isEndTest) {
          // show impulses count on page
          this.isEndTest = true;

          // send data to authService to send it to server
          this.authService.dataSource.next({
            isStartTest: this.isStartTest,
            progressValue: 30,
            timeRemain: this.timeRemain,
            isEndTest: this.isEndTest,
            impulseCount: this.authService.impulses
          });
          const dataToSend = {
            isStartTest: this.isStartTest,
            progressValue: 30,
            timeRemain: this.timeRemain,
            isEndTest: this.isEndTest,
          }

          this.authService.sendTestResult(dataToSend);
          return;
        }

        this.progressValue = curr++;
        this.timeRemain = Math.floor((constantas.TEST_TIME_MAX - this.progressValue) / 10);

        this.authService.dataSource.next({
          isStartTest: this.isStartTest,
          progressValue: this.progressValue,
          timeRemain: this.timeRemain,
          isEndTest: this.isEndTest,
          impulseCount: this.authService.impulses
        });
        console.log('this.progressValue: ', this.progressValue)
      }
    }, 100)
  }
}