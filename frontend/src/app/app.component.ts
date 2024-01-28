import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'
import {MatToolbarModule} from '@angular/material/toolbar';
import { HomeComponent } from "./home/home.component";
import { QuestionComponent } from './question/question.component';
import { DataDisplayComponent } from './data-display/data-display.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
      RouterOutlet, 
      MatSlideToggleModule, 
      MatToolbarModule, 
      HomeComponent, 
      RouterLink, 
      RouterLinkActive, 
      QuestionComponent,
      DataDisplayComponent,
      FlexLayoutModule
    ]
})

export class AppComponent {
  title = 'frontend';
}
