import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  getproducts: any;

  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authservice.getProduct().subscribe((res:any) =>
    {
      this.getproducts = res;
      console.log(this.getproducts) 
    })
  }
  counter = 0;
  prodPrice = 0;
  grams = 0;

  increment() {
    this.counter = this.counter + 1;
    this.prodPrice = this.prodPrice + this.getproducts[0].price
    this.grams= this.counter * this.getproducts[0].grams
    console.log(this.prodPrice)
  }
  
  order()
  {
    localStorage.setItem("Quantity", String(this.counter));
    localStorage.setItem("Price", String(this.prodPrice));
    localStorage.setItem("Grams", String(this.grams));
    this.router.navigate(['/order']);
  }


}
