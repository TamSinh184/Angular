import { User } from '../../model/user.class';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit , OnDestroy{
  subscription: Subscription;
  users: User[]=[];
  p: number = 1;

  constructor(
    public userService: UserService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy(){
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadData(){
    this.subscription = this.userService.getAllUser().subscribe(
      data => {
         this.users = data;

      },error => {
        this.userService.handleError(error);
      }
    );
  }


  deleteUser(idx : number){
    this.subscription = this.userService.delelteUser(idx).subscribe(
      (data: User) => {
        this.updatedDataAfterDelete(idx);
      });
  }

  updatedDataAfterDelete(id: number){
    for (var i = 0; i < this.users.length; i++){
      if(this.users[i].id == id) {
        this.users.splice(i,1)
        break;
      }
    }
  }

  isNameShowed(){

  }
  sortNameAZ(){

  }
}
