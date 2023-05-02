import { Injectable } from '@angular/core';
import {User} from "../../models/user.model";
import {UUID} from "angular2-uuid";
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  users : User[] = [];
  authenticatedUser : User | undefined;
  constructor() {
    this.users.push({id:UUID.UUID(),username:"user",password:"123",roles:["USER"]});
    this.users.push({id:UUID.UUID(),username:"admin",password:"123",roles:["USER","ADMIN"]});
  }

  public login(username : string, password:string) : Observable<User>{
    let user = this.users.find(u => u.username == username);
    if(!user) return throwError(()=>new Error("User not found"))
    if (user.password != password) return  throwError(()=> new Error("Bad Credentials"));
    return of(user);
  }

  public authenticateUser(user : User) : Observable<boolean>{
    this.authenticatedUser = user;
    localStorage.setItem("authUser", JSON.stringify({username:user.username, roles:user.roles}));
    return of(true);
  }

  public hasRole(role : string) : boolean{
    return this.authenticatedUser!.roles.includes(role);
  }

  public isAuthenticated(){
    return this.authenticatedUser != undefined;
  }

  public logout(): Observable<boolean>{
    this.authenticatedUser = undefined;
    localStorage.removeItem("authUser");
    return of(true);
  }
}
