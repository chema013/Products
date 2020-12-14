import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product: Product = {
    name: '',
    description: '',
    price: 0,
    imageURL: ''
  };

  edit: boolean = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    console.log(params);
    if (params) {
      this.productService.getProduct(params.id)
        .subscribe(
          (res: any) => {
            console.log(res);
            this.product = res.product;
            this.edit = true;
          }
        )
    }
  }

  submitProduct() {
    this.productService.createProduct(this.product)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/']);
        },
        err => console.log(err)
      );
  }

  updateProduct() {
    delete this.product.createAt;
    this.productService.updateProduct(this.product._id, this.product)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/product']);
        },
        err => console.log(err)
      );
  }

}
