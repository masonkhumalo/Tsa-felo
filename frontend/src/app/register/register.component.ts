import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    location: new FormControl(''),
    password: new FormControl('')
  });

  submitted = false;

  constructor(private fb :FormBuilder, private authservice :AuthService) {
    this.myForm();
   }

   myForm()
   {
   this.registerForm = this.fb.group ({
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
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
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      location: this.registerForm.value.location,
      password: this.registerForm.value.password 
    }

    console.log(usersDetails)

    this.authservice.createUser(usersDetails).subscribe((res)=>{
      console.log("success!")
     })
  
  }




// createUser(form : FormGroup){
//    this.authservice.createUser(usersDetails).subscribe((data:any)=>{
//     console.log("success!")
//    })
// }



  


}