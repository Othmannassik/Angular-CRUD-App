import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/products/product.service";
import {Product} from "../../models/product.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication/authentication.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products! : Array<Product>;
  currentPage : number =0;
  pageSize : number = 5;
  totalPages! : number;
  errorMessage! : string;
  searchFormGroup! : FormGroup;
  currentAction : string = "All";

  constructor(private productService : ProductService, private fb : FormBuilder,
              public authService : AuthenticationService) {
  }
  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword : this.fb.control(null)
    });
    this.handleGetPageProducts();
  }

  handleGetPageProducts(){
    this.productService.getPageProducts(this.currentPage, this.pageSize).subscribe({
      next : (data) => {
        this.products = data.products;
        this.totalPages = data.totalPages;
      },
      error : err => {
        this.errorMessage = err;
      }
    });
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

  handleSearchProduct() {
    this.currentAction = "Search";
    this.currentPage=0;
    let keyword = this.searchFormGroup.value.keyword;
    this.productService.searchProduct(keyword, this.currentPage, this.pageSize).subscribe({
      next : (data) =>{
        this.products = data.products;
        this.totalPages = data.totalPages;
      }
    })
  }

  goToPage(i: number) {
    this.currentPage = i;
    if(this.currentAction==="All")
      this.handleGetPageProducts()
    else
      this.handleSearchProduct();
  }
}
