import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{  
  genders = ['male', 'female'];
  signUpForm : FormGroup;
  forBiddenUserNames = ['Chris', 'Anna'];

  ngOnInit(){
    this.signUpForm = new FormGroup({
     'userData' : new FormGroup({
      'username' : new FormControl(null, [Validators.required, this.forBiddenNames.bind(this)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
     }),
     'gender': new FormControl('male'),
     'hobbies': new FormArray([]),
    })
  }

  onSubmit(){
    console.log(this.signUpForm);
  }

  onAddHobbies(){
    (<FormArray>this.signUpForm.get('hobbies')).push(new FormControl(null, [Validators.required]));
  }

  forBiddenNames(control: FormControl) : {[s : string] : boolean} {
   if(this.forBiddenUserNames.indexOf(control.value) !== -1){
     return {'nameIsForbidden': true };
   }
   return null;
  }
}
