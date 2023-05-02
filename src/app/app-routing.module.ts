import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./components/products/products.component";
import {LoginComponent} from "./components/login/login.component";
import {TemplateComponent} from "./components/template/template.component";
import {AuthenticationGuard} from "./guards/authentication/authentication.guard";

const routes: Routes = [
  {path : "" , component : LoginComponent},
  {path : "login" , component : LoginComponent},
  {path : "admin" , component : TemplateComponent, canActivate : [AuthenticationGuard],
    children : [
      {path : "products" , component : ProductsComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
