import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/types';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;
  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  shopParams = new ShopParams();
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low', value: 'priceAsc'},
    {name: 'Price: High', value: 'priceDesc'},
  ];
  totalCount = 0;

  constructor(private shopServices: ShopService){}
  
  ngOnInit(): void {
    this.getBrands()
    this.getProducts()
    this.getTypes()
  }

  getProducts(){
    this.shopServices.getProducts(this.shopParams).subscribe(
      {
        next: response =>{
          this.products = response.data;
          this.shopParams.pageNumber = response.pageIndex;
          this.shopParams.pageSize = response.pageSize;
          this.totalCount = response.count;
        },
        error: error => console.log(error)
      }
    );
  }

  getBrands(){
    this.shopServices.getBrands().subscribe(
      {
        next: response => this.brands = [{id: 0, name: 'All'}, ...response],
        error: error => console.log(error)
      }
    );
  }

  getTypes(){
    this.shopServices.getTypes().subscribe(
      {
        next: response => this.types = [{id: 0, name: 'All'}, ...response],
        error: error => console.log(error)
      }
    );
  }

  onBrandSelected(brandId: number){
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number){
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(event: any){
    this.shopParams.sort = event.target.value;
    this.getProducts();
  }
  onPageChanged(event: any){
    if (this,this.shopParams.pageNumber !== event){
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }
  onSearch(){
    this.shopParams.search = this.searchTerm?.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onReset(){
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }

}
