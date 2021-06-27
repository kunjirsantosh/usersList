import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../users.service';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  users = [];
  userId = 0;
  constructor(private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private userService: UserService) { }

  public userForm = this.fb.group({
    firstName: ["", Validators.required],
    lastName:[""],
    email:["",Validators.email],
    phone:["",Validators.required],
    status:[""],

  });

  ngOnInit(): void {
    let user = [];
    this.users = this.userService.getUser;
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['id'];
      user = this.users.find(user => { return user.id == this.userId});
      this.setFormData(user);
  });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    //this.setFormData(user);
    // changes.prop contains the old and the new value...
  }

  setFormData(user){
    this.userForm.get("firstName").setValue(user.firstName);
    this.userForm.get("lastName").setValue(user.lastName);
    this.userForm.get("phone").setValue(user.phone);
    this.userForm.get("email").setValue(user.email);
    this.userForm.get("status").setValue(user.status);
  }

  formSubmit(){
    let message = "User Added Successfully!";
    if(this.userId){
      let tempUsers = this.userService.users;
      this.userService.users = [];
      message = "User Updated Successfully!";
      this.userService.users = tempUsers.filter(user => { return user.id !== this.userId});
    }
    this.userService.setUser = this.userForm.value;
    this.snackbar.open(message, "Close",{
      duration: 3000
    });
    this.router.navigate(["/","users"]);
  }
  
  get f() { return this.userForm.controls; }

}
