import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.productService.getProducts()
      .subscribe(
        (res: any) => {
          this.products = res.products;
          console.log(res)
        },
        err => console.log(err)
      )
  }

  deleteProduct(id: string | undefined) {
    console.log(id);
    this.productService.deleteProduct(id)   
    .subscribe(
      res => {
        this.getProducts();
      },
      err => console.log(err)
    )
  }

}
