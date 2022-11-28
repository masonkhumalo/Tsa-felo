import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';




const httpOptions = {
  headers: new HttpHeaders({ 
    "Access-Control-Allow-Origin": "*",
    'Content-Type': 'application/json' }
    )
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "http://localhost:3000"

  constructor(private http: HttpClient) { }


  createUser(body:any){
    return this.http.post(`${this.baseUrl}/users`,body)
  }

  login(loginDetails:any){
    return this.http.post(`${this.baseUrl}/login`,loginDetails)
  }
}
