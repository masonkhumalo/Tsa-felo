export class UserService{

  loggedIn : boolean = false

  login(){

    this.loggedIn = true
  }

  // logout(){
  //   this.loggedIn = false
  // }

  IsAuthenticated(){
   return this.loggedIn ;
  }
}