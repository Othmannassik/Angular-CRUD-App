import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  userFormGroup! : FormGroup;
  errorMessage! : string;
  constructor(private fb : FormBuilder, private authService : AuthenticationService, private router : Router) {
  }
  ngOnInit(): void {
    this.userFormGroup = this.fb.group({
      username : this.fb.control(""),
      password : this.fb.control("")
    });
  }

  handleLogin() {
    let username = this.userFormGroup.value.username;
    let password = this.userFormGroup.value.password;
    this.authService.login(username, password).subscribe({
      next :(user) => {
        this.authService.authenticateUser(user).subscribe({
          next :(data) => {
            this.router.navigateByUrl("/admin");
          }
        });
      },
      error : (err) => {
        this.errorMessage = err;
      }
    });
  }
}
