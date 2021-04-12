import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from './user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  readonly rootUrl = 'http://localhost:56391';
  constructor(private http: HttpClient) { }
  formData:User;
  form: FormGroup = new FormGroup({
    userName: new FormControl(null),
    password: new FormControl('', Validators.required),
  });
  registerUser(user: User) {
    const body: User = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName
    }
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(this.rootUrl + '/api/User/Register', body,{headers : reqHeader});
  }

  userAuthentication(formData : User) {

    this.form.setValue(formData);

    var data = "username="+this.form.value['userName']+"&password="+this.form.value['password']+"&grant_type=password";
    
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded','No-Auth':'True' });
    var ret =this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
    
    return ret;
  }

  getUserClaims(){
  var data =this.http.get(this.rootUrl+'/api/GetUserClaims',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})}).toPromise();
  console.log(localStorage.getItem('id'));
  
  return data;
  }
  getUserProfil(idchar : string){
    var data =this.http.get(this.rootUrl+'/api/GetUserProfil/'+idchar,{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})}).toPromise();
    console.log(data);
  
    return data;
    }
}