import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  isLoginError : boolean = false;
  constructor(private service : UserService,private router : Router) { }

  ngOnInit() {
  }

  OnSubmit(){
console.log(this.service.form.value);
     this.service.userAuthentication(this.service.form.value).subscribe((data : any)=>{
      localStorage.setItem('userToken',data.access_token);
      this.service.getUserClaims().then((data : any)=>{
        console.log(data);
        localStorage.setItem('id',data.IdChar);
        localStorage.setItem('IdInt',data.UtilisateurID);
        localStorage.setItem('profil',data.ProfilUtilisateur);
        localStorage.setItem('club',data.ClubID);
       })
       
      
    }
    
    ,
    (err : HttpErrorResponse)=>{
      this.isLoginError = true;
    });
    if(localStorage.getItem('id')!=''){
      this.router.navigate(['/home/dashboard']);
    }
  }

}