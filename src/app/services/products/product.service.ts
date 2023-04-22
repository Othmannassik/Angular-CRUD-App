import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {Product} from "../../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products! : Array<Product>
  constructor() {
    this.products = [
      {id:1, name:"Computer", price:7200, promotion : true},
      {id:2, name:"Printer", price:600, promotion : false},
      {id:3, name:"Phone", price:4500, promotion : false}
    ]
  }

  public getAllProducts() : Observable<Product[]>{
    let number = Math.random();
    if(number<0.1) return throwError(()=> new Error("network Error"));
    return of(this.products);
  }

  public deleteProduct(id : number) : Observable<boolean>{
    this.products.filter(p=>p.id != id);
    return of(true);
  }

  public setPromotion(id : number) : Observable<boolean>{
    let product = this.products.find(p=>p.id == id);
    if (product != undefined){
      product.promotion = !product.promotion;
      return of(true);
    } else {
      return throwError(()=> new Error("Product not found"));
    }
  }

}
