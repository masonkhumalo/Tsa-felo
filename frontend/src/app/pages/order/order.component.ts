import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  quantity:any = localStorage.getItem("Quantity"); 
  price:any = localStorage.getItem("Price"); 
  grams : any = localStorage.getItem("Grams")

  constructor() { }

  ngOnInit(): void {
  }

}
