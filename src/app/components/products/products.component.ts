import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/products/product.service";
import {Product} from "../../models/product.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products! : Array<Product>;
  errorMessage! : string;

  constructor(private productService : ProductService) {
  }
  ngOnInit(): void {
    this.handleGetAllProducts();
  }

  handleGetAllProducts(){
    this.productService.getAllProducts().subscribe({
      next : (data) => {
        this.products = data;
      },
      error : err => {
        this.errorMessage = err;
      }
    });
  }

  handleDeleteProduct(p: Product) {
    let conf = confirm("Are you sure ? ");
    if(!conf) return;
    this.productService.deleteProduct(p.id).subscribe({
      next: (data) =>{
          let number = this.products.indexOf(p);
          this.products.splice(number,1);
      }
    });
  }

  handlePromotion(p: Product) {
    let promo = p.promotion;
    this.productService.setPromotion(p.id).subscribe({
      next : (data) =>{
        p.promotion = !promo;
      }
    })
  }
}
