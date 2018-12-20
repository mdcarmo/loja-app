import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  totalproduct: string;
  totalsoldProduct: string;

  constructor() { }

  ngOnInit() {
    this.totalproduct = "500";
    this.totalsoldProduct = "R$ 5.000,00";
  }
}
