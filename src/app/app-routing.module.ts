import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./components/products/products.component";
import {LoginComponent} from "./components/login/login.component";
import {TemplateComponent} from "./components/template/template.component";
import {AuthenticationGuard} from "./guards/authentication/authentication.guard";
import {NewProductComponent} from "./components/new-product/new-product.component";

const routes: Routes = [
  {path : "" , component : LoginComponent},
  {path : "login" , component : LoginComponent},
  {path : "admin" , component : TemplateComponent, canActivate : [AuthenticationGuard],
    children : [
      {path : "products" , component : ProductsComponent},
      {path : "newProduct" , component : NewProductComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
