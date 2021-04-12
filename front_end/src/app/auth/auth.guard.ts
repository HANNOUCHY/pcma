import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../shared/user.service'
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router : Router,private service :UserService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      
      if (localStorage.getItem('userToken') != null){
        console.log("--------____________-----------");
        console.log(localStorage.getItem('id'));
        console.log("--------____________-----------");
        console.log(localStorage.getItem('profil'));
        console.log("--------____________-----------");
        console.log(localStorage.getItem('IdInt'));
       return true; 
      }else{
        this.router.navigate(['/login']); return false;
      }
       
      
      
     
  }
}