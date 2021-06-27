import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './users.service';
export interface Users {
  id: number
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  status: boolean;
}

const USERS_DATA: Users[] = [
  {id: 1, firstName: "John", lastName: 'Dove', email: 'john.dove@abc.com', phone: 1234667895, status:true},
  {id: 2, firstName: "Steve", lastName: 'Evel', email: 'sateve.evel@abc.com', phone: 3234667895, status:false},
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone','status', 'action'];
  dataSource: Users[]= USERS_DATA;
  constructor(private userService: UserService,
    private snackbar: MatSnackBar,) { }

  ngOnInit(): void {
    this.dataSource = this.userService.getUser;
  }

  deleteUser(id:any){
    this.userService.users = [];
    this.dataSource = this.dataSource.filter(user => { return user.id !== id});
    this.snackbar.open("User Removed Successfully!", "Close",{
    duration: 3000
   });
   this.userService.users = this.dataSource;
  }
}
