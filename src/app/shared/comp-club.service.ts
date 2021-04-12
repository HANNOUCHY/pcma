import { Injectable } from '@angular/core';
import { Club } from './club.model';
import {HttpClient}from "@angular/common/http";

import * as _ from 'lodash';

import { Observable } from 'rxjs';
import {MatTableDataSource} from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class Comp_ClubService {
  formData:Club;
  list :Club[]; 
  data:any;
  readonly rootURL ="http://localhost:56391/api/";
   
  constructor(private http : HttpClient) {}
 
  dataSource= new MatTableDataSource<Club>();
 
  
  postClub(formData : Club){
    console.log(formData);
return this.http.post<Club>(this.rootURL+'Comp_Club',formData).toPromise().then((data: any) =>{ 
  this.dataSource.data=data;
});
  }  
  getClub():Observable<any>{
    this.data = this.http.get(this.rootURL + 'Comp_Club');
    
   return this.data;  
  
  }

  
  putClub(formData:Club){
    
   
    this.data=this.http.put<Club>(this.rootURL+'Comp_Club/'+formData.ClubID,formData);
    return this.data;
      }
      getByID(id:number):any {
        return this.http.get<Club>(this.rootURL+'Comp_Club/'+id).toPromise();
      }
     
   
 
   
   deleteClub(formData:Club){
    
  this.http.delete<Club>(this.rootURL+'Comp_Club/'+formData.ClubID).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
   
  
  }

 
}
