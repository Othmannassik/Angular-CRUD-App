import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {PageProduct, Product} from "../../models/product.model";
import {UUID} from "angular2-uuid";
import {ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products! : Array<Product>
  constructor() {
    this.products = [
      {id:UUID.UUID(), name:"Computer", price:7200, promotion : true},
      {id:UUID.UUID(), name:"Printer", price:600, promotion : false},
      {id:UUID.UUID(), name:"Phone", price:4500, promotion : false}
    ];

    for (let i = 0; i < 15; i++) {
      this.products.push({id:UUID.UUID(), name:"Computer", price:7200, promotion : true});
      this.products.push({id:UUID.UUID(), name:"Printer", price:600, promotion : false});
      this.products.push({id:UUID.UUID(), name:"Phone", price:4500, promotion : false});
    }
  }

  public getAllProducts() : Observable<Product[]>{
    let number = Math.random();
    if(number<0.1) return throwError(()=> new Error("network Error"));
    return of(this.products);
  }

  public getPageProducts(page : number, size : number) : Observable<PageProduct>{
    let index = page*size;
    let totalPages = ~~(this.products.length / size);
    if(this.products.length % size != 0)
      totalPages++;
    let pageProduct = this.products.slice(index, index + size);
    return of({page:page, size:size, totalPages: totalPages, products: pageProduct});
  }

  public deleteProduct(id : string) : Observable<boolean>{
    this.products.filter(p=>p.id != id);
    return of(true);
  }

  public setPromotion(id : string) : Observable<boolean>{
    let product = this.products.find(p=>p.id == id);
    if (product != undefined){
      product.promotion = !product.promotion;
      return of(true);
    } else {
      return throwError(()=> new Error("Product not found"));
    }
  }

  public searchProduct(keyword : string, page : number, size : number) : Observable<PageProduct>{
    let result = this.products.filter(p=>p.name.includes(keyword));
    let index = page*size;
    let totalPages = ~~(result.length / size);
    if(this.products.length % size != 0)
      totalPages++;
    let pageProduct = result.slice(index, index + size);
    return of({page:page, size:size, totalPages: totalPages, products: pageProduct});
  }

  public addNewProduct(product : Product): Observable<Product>{
    product.id = UUID.UUID();
    this.products.push(product);
    return of(product);
  }

  public getProduct(id : string):Observable<Product>{
    let product = this.products.find(p => p.id==id);
    if(product == undefined) return throwError(()=>new Error("Product not found"));
    return of(product);
  }

  public updateProduct(product : Product) : Observable<Product>{
    this.products = this.products.map(p => (p.id==product.id) ? product : p);
    return of(product);
  }

  getErrorMessage(fieldName: string, error: ValidationErrors) {
    if(error["required"])
      return fieldName + " is required";
    else if(error["minlength"])
      return fieldName + " should have at least " + error["minlength"]["requiredLength"] + " Characteres";
    else if(error["min"])
      return "The min value for "+ fieldName +" is "+ error["min"]["min"];
    else
      return "";
  }
}
