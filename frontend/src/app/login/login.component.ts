import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup = new FormGroup({
    email: new FormControl(''),
    password : new FormControl('')
  });

  decoded : any

  submitted = false;
  log: any;
 

  constructor(private authservice : AuthService, private router : Router,
  private toastservice : NgToastService, private formbuilder : FormBuilder) { 
    this.myForm();
  }

  ngOnInit(): void {

  }

  myForm (){
    this.loginForm= this.formbuilder.group({
      email : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required])
    })
  }
  
  get formValidation(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  login(){
    this.submitted = true;
    let loginDetails = {
      email:this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    console.log(loginDetails)
    if(loginDetails.email != '' && loginDetails.password != ''){
      this.authservice.login(loginDetails).subscribe((data : any )=>{

         this.decoded = jwt_decode(data.token)
          console.log(this.decoded)
         this.toastservice.success({detail:'Success', summary:'Successfully login!', sticky:false,position:'tr', duration:6000})
         this.router.navigate(['/starter'])
        sessionStorage.setItem('logginToken', data.token)
       sessionStorage.setItem('loggedEmail', this.decoded.email);
         this.submitted = false ;
      },(error) =>{

        this.toastservice.warning({detail:'Warning',summary:'Email or Password is invalid', sticky:false,position:'tr', duration:600000})

        })

    }
  }

  // loginForm = new FormGroup({
  //   email: new FormControl(''),
  //   password: new FormControl('')
  // });

  // submitted: any;

  // constructor(private fb :FormBuilder) {
  //   this.myForm();
  //  }

  //  myForm()
  //  {
  //  this.loginForm  = this.fb.group ({
  //     email: ['',[Validators.required,Validators.email ]],
  //     password: ['',[Validators.required]]
  //   });
  //  }

  // ngOnInit(): void {
  // }

   get f() { return this.loginForm.controls; }
  // adduser(){

  //   this.submitted = true; 
    
  //   let usersDetails = {
  //     email: this.loginForm.value.email,
  //     password: this.loginForm.value.password 
  //   }
  //   console.log(usersDetails);
  // }



}
