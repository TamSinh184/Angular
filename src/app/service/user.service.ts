import { User } from './../model/user.class';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public API :  string = 'http://localhost:3000/users';

  constructor(
    public http : HttpClient
  ) { }

  getAllUser() : Observable<any> {
    return this.http.get(this.API);
  }

  handleError(err) {
    if(err.error instanceof Error){
      console.log(`Client side error: ${err.error.messagge}`)
    }
  }

  addUser( user: User) : Observable<any>{
    console.log(user)
    return this.http.post(this.API, user);
  }

  editUser(user: User) : Observable<any> {
    return this.http.put(`${this.API}/${user.id}`, user);
  }

  delelteUser(id: number) : Observable<any>{
    return this.http.delete(`${this.API}/${id}`);
  }

  getUserByID(id: number) : Observable<any>  {
    return this.http.get(`${this.API}/${id}`)
  }

}
