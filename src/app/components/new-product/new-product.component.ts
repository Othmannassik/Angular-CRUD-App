import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ProductService} from "../../services/products/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit{

  productFormGroup! : FormGroup;

  constructor(private fb : FormBuilder, private prodService : ProductService, private router : Router) {
  }
  ngOnInit(): void {
    this.productFormGroup= this.fb.group({
      name : this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      price : this.fb.control(null, [Validators.required, Validators.min(200)]),
      promotion : this.fb.control(false, Validators.required),
    });
  }

  handleAddProduct() {
    let product = this.productFormGroup.value;
    this.prodService.addNewProduct(product).subscribe({
      next : (data)=>{
        this.router.navigateByUrl("/admin/products");
      }
    });
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
