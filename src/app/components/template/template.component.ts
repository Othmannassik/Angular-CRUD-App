import { Component } from '@angular/core';
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent {

  constructor(public authService : AuthenticationService, private router:Router) {
  }

  handleLogout() {
    this.authService.logout().subscribe({
      next : (data)=>{
        this.router.navigateByUrl("/login");
      }
    });
  }
}
