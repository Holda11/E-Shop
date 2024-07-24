import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from './models/product';
import { Pagination } from './models/pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'E-Shop';
  products: Product[] = [];
  
  constructor(private http: HttpClient)
  {

  }
  ngOnInit(): void {
    this.http.get<Pagination<Product[]>>('https://localhost:5001/api/products?pageSize=50').subscribe({
      next: response => this.products = response.data, //what to do next
      error: error => console.log(error), //what to do if error happend
      complete: ()=> {
        console.log("Response completed"); //what to do if response finished
        console.log("Extra statment");
      }
    })
  }
}
