import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss']
})
export class StarterComponent implements OnInit {
  getproducts: any;

  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
    this.authservice.getProduct().subscribe((res:any) =>
    {
      this.getproducts = res;
      console.log(this.getproducts) 
    })
  }

}
