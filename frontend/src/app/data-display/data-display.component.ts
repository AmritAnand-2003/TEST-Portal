import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';


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
  selector: 'app-data-display',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    HttpClientModule
  ],
  templateUrl: './data-display.component.html',
  styleUrl: './data-display.component.css'
})



export class DataDisplayComponent implements OnInit {
  httpClient = inject(HttpClient);
  data: Ques[] = []

  ngOnInit(): void {
     this.fetchData()
  }

  fetchData(){
    this.httpClient.get('http://127.0.0.1:8000/api/ques/').subscribe((data: any) => {
      // console.log(typeof data)
      // console.log(data)
      // console.log(data[0].question)
      this.data = data;
    });
  }
}
