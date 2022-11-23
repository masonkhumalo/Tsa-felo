import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  submitted: any;

  constructor(private fb :FormBuilder) {
    this.myForm();
   }

   myForm()
   {
   this.loginForm  = this.fb.group ({
      email: ['',[Validators.required,Validators.email ]],
      password: ['',[Validators.required]]
    });
   }

  ngOnInit(): void {
  }

  get f() { return this.loginForm.controls; }
  adduser(){

    this.submitted = true; 
    
    let usersDetails = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password 
    }
    console.log(usersDetails);
  }

}
