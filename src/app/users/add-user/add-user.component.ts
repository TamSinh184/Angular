import { UserService } from '../../service/user.service';
import { User } from '../../model/user.class';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  user : User = {} as User;
  subscription: Subscription;
  selectedFile: File= null;
  constructor(
    public userService: UserService,
    public http: HttpClient,
    public routerService: Router

  ) { }

  ngOnInit() {
  }

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
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

  onAddUser(value: NgForm){
    console.log(value)
    this.subscription = this.userService.addUser(this.user).subscribe(
      data =>{
        if(data = data.id){
          this.routerService.navigate(['user']);
        }
      }
    );
  }

  onSubmit(value){
    console.log(value)
  }
}
