import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    ReactiveFormsModule, 
    JsonPipe, 
    MatButtonModule, 
    MatInputModule, 
    MatFormFieldModule, 
    FormsModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


  title = 'dynamic-form';
  constructor( private formBuilder : FormBuilder){}

  showForm: boolean = false;

  toggleForm(){
    this.showForm = !this.showForm
  }

  userGroup :FormGroup = this.formBuilder.group({
    name : [''],
    email : [''],
    city : [''],
    contacts : this.formBuilder.array([
      this.formBuilder.group({
        number : [''],
        type : [''],
        description : ['']
      })
    ])
  })

  get contacts(){
    return this.userGroup.get('contacts') as FormArray;
  }

  addContact(){
    this.contacts.push(
      this.formBuilder.group({
        number : [''],
        type : [''],
        description : ['']
      })
    )
  }

  deleteContact(id: number) {
    this.contacts.removeAt(id);
  }

  users : any[] = [];
  onSubmit() {
    this.users.push(this.userGroup.value)
  }
}
