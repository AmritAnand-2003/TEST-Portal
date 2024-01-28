import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
// import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroupDirective, NgForm} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {ErrorStateMatcher} from '@angular/material/core';



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, RouterOutlet, 
    RouterLink,
    RouterLinkActive,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('name') nameKey!: ElementRef;
  startQuiz(){
    console.log('startQuiz');
    localStorage.setItem("name",this.nameKey.nativeElement.value);
  }
  text = new FormControl('', [Validators.required]);
  getErrorMessage() {
    return 'You must enter your name.';
    }

    selected = new FormControl('valid', [Validators.required]);
    matcher = new MyErrorStateMatcher();

}
