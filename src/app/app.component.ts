import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';


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
      'email': new FormControl(null, [Validators.required, Validators.email], [this.forBiddenEmails.bind(this)]),
     }),
     'gender': new FormControl('male'),
     'hobbies': new FormArray([ new FormControl()]),
    });
    
    // this.signUpForm.valueChanges.subscribe(
    //   (value) => {console.log(value);}
    // );
    
    // this.signUpForm.statusChanges.subscribe(
    //   (value) => {console.log(value);}
    // )

    // this.signUpForm.setValue({
    //   'userData'  : {
    //     'username': 'bharath',
    //     'email'   : 'bharathgorental@gmail.com'
    //   },
    //   'gender'    : 'male',
    //   'hobbies'   : ['coding'],
    // });

    // this.signUpForm.patchValue({
    //   'userData' : {
    //     'username': 'Bharath Gorental',
    //   }
    // })
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

  forBiddenEmails(control : FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(()=>{
        if(control.value === 'test@gmail.com'){
          resolve({'emailIsForbidden' : true})
        }else{
          resolve(null);
        }
      }, 1500)
  });
  return promise;
}
}
