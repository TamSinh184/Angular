import { User } from '../../model/user.class';
import { UserService } from '../../service/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit, OnDestroy {
  public user : User = {} as User;
  subscription: Subscription;
  subscriptionParams: Subscription;

  constructor(
    public userService: UserService,
    public http: HttpClient,
    public routerService: Router,
    public activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    if(this.subscription){
       this.subscription.unsubscribe();
    }
  }

  loadData(){
    this.subscriptionParams = this.activatedRoute.params.subscribe((data : Params) => {
      let id = data['id'];
      this.subscription = this.userService.getUserByID(id).subscribe(
        (user: User) => {
          this.user = user;
          console.log(this.user);
        }
      );
    });
  }

  onBack(){
    this.routerService.navigate(['user']);
  }

  onAddUser(){
    this.subscription = this.userService.editUser(this.user).subscribe(
      data =>{
        if(data = data.id){
          this.routerService.navigate(['user']);
        }
      }
    );
  }

  onFileSelected(event){
    var preview:any = document.querySelector('#imageAdd'); //selects the query named img
    var file:any    = event.target.files[0]; //sames as here
    var reader:any  = new FileReader();

    reader.onloadend = () => {
        preview.src = reader.result;
        this.user.picture = reader.result;

    }

    if (file) {
        reader.readAsDataURL(file);
        console.log(reader.readAsDataURL(file))
    } else {
        preview.src = "";
    }
  }
}
