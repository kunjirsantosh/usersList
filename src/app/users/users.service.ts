import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   users = [];
   userId = 1;
  constructor() { }

  set setUser(user:any){
    user.id = this.userId++;
    this.users.push(user);
  }
  get getUser(){
    return this.users;
  }

  removeAllUsers(){
    this.users=[];
  }
}
