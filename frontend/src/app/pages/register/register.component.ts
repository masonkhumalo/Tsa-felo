import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    location: new FormControl(''),
    password: new FormControl('')
  });

  submitted = false;

  constructor(private fb :FormBuilder, private authservice :AuthService,private router: Router) {
    this.myForm();
   }

   myForm()
   {
   this.registerForm = this.fb.group ({
      firstname: ['',[Validators.required]],
      lastname: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email ]],
      location: ['',[Validators.required]],
      password: ['',[Validators.required]]
    });
   }

  ngOnInit(): void {
  }

  get f() { return this.registerForm.controls; }

  adduser(){

    this.submitted = true; 

    let usersDetails = {
      firstname: this.registerForm.value.firstname,
      lastname: this.registerForm.value.lastname,
      email: this.registerForm.value.email,
      location: this.registerForm.value.location,
      password: this.registerForm.value.password 
    }

    console.log(usersDetails)

    if(this.registerForm.value.firstname != '' && this.registerForm.value.firstname != null)
    {
      this.authservice.createUser(usersDetails).subscribe((res:any)=>{
        console.log(res.message)
        this.router.navigateByUrl('/starter')
        
       },(err:HttpErrorResponse)=>{
        console.log(err);
  
       })
    }
    
  
  }




// createUser(form : FormGroup){
//    this.authservice.createUser(usersDetails).subscribe((data:any)=>{
//     console.log("success!")
//    })
// }



  


}