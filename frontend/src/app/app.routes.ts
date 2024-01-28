import { Routes } from '@angular/router';
import { QuestionComponent } from './question/question.component';
import { HomeComponent } from './home/home.component';
import { DataDisplayComponent } from './data-display/data-display.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home-component', pathMatch: 'full'}, 
    {path: 'home-component', component: HomeComponent},
    {path: 'question-component', component: QuestionComponent},
    {path: '**', component: DataDisplayComponent}
];
