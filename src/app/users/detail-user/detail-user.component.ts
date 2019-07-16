import { User } from '../../model/user.class';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss']
})
export class DetailUserComponent implements OnInit {
  public user: User = {} as User;
  subscription: Subscription;
  subscriptionParams: Subscription;
  users: User[]=[];
  constructor(
    public userService: UserService,
    public routerService: Router,
    public http: HttpClient,
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
        }
      );
    });
  }

  onBack(){
    this.routerService.navigate(['user']);
  }

  delete(idx){
    var result = confirm('Do you want to Delete')
    if(result){
      this.deleteProductDetail(idx);

    }

    }

  deleteProductDetail(id){
    this.subscription = this.userService.delelteUser(id).subscribe(
      (data: User) => {
        this.updatedDataAfterDelete(id);
        this.onBack();
      });
  }
  updatedDataAfterDelete(id: number){
    for (var i = 0; i < this.users.length; i++){
      console.log(this.users[i].id + "sanr pham tim thays")
      if(this.users[i].id == id) {
        this.users.splice(i,1)
        break;
      }
    }
  }

}
