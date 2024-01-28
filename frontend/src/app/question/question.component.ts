import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { interval } from 'rxjs';
import { MatDividerModule} from '@angular/material/divider';
import { ChangeBgDirective } from '../change-bg.directive';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ApprovalService } from '../service/approval.service';

export interface Ques {
  question: string;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  answer: string;
  [key: string]: string;
}

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    CommonModule,
    HttpClientModule,
    MatDividerModule,
    ChangeBgDirective,
    FlexLayoutModule
  ],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css',
})
export class QuestionComponent {
  httpClient = inject(HttpClient);
  data: any[] = []
  ngOnInit(): void {
    this.fetchData()
    this.startCounter();
    if(localStorage){
      this.name = localStorage.getItem("name")!;
    }
    else{
      console.error('localStorage is not supported in this environment.');
    }
  }

  fetchData(){
    this.httpClient.get('http://127.0.0.1:8000/api/ques/').subscribe((data: any) => {
      console.log(typeof data)
      console.log(data)
      console.log(data[0].question)
      console.log(data[0].option1)
      // // this.data = data;
      this.questionList = data
      this.leng = data.length
      console.log(this.leng)
      console.log(typeof this.questionList)
      console.log(this.questionList[1].question)
    });
  }
  public name: string = "Amrit";
  public questionList: Ques[] = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$:  any;
  progress: string = "0";
  isQuizCompleted: boolean = false;
  leng : number = 0;

  // constructor(private approvalService: ApprovalService) { }

  

  ngOnDestroy(): void {
    this.stopCounter();
  }


  nextQuestion() {
    this.currentQuestion++;
  }

  previousQuestion() {
    this.currentQuestion--;
  }

  answer(currentQno: number, option: string) {
    console.log("currentQuestion : " + (currentQno + 1) + " in " + this.leng)
    console.log("option : " + option)
    if (currentQno + 1 === this.leng) {
      this.isQuizCompleted = true;
      console.log("Quiz Completed : " + this.isQuizCompleted)
      this.stopCounter();
    }
    console.log(this.questionList[currentQno].answer)
    if(option === ''){
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);
    }
    else if (option === this.questionList[currentQno].answer) {
      this.points += 10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);
    }
    else {
      setTimeout(() => {
        this.currentQuestion++;
        this.inCorrectAnswer++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);
      this.points -= 5;
    }
  }

  startCounter() {
    this.interval$ = interval(1000).subscribe(val => {
      this.counter--;
      if (this.counter === 0) {
        this.currentQuestion++;
        this.counter = 60;
        // this.points -= 10;
      }
    });
    setTimeout(() => {
      if (this.interval$) {
        this.interval$.unsubscribe();
      }
    }, 600000);
  }

  stopCounter() {
    if (this.interval$) {
      this.interval$.unsubscribe();
    }
    this.counter = 0;
  }

  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }

  resetQuiz() {
    this.resetCounter();
    this.fetchData();
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.progress = "0";
  }

  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.leng) * 100).toString();
    console.log("Progress: " + this.progress)
    return this.progress;
  }
}
