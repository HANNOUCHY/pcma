import { Injectable } from '@angular/core';
import { Profil } from './profil.model';
import {HttpClient, HttpHeaders}from "@angular/common/http";

import { FormGroup, FormControl, Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  formData:Profil;
  list :Profil[]; 
  data:any;
  authToken: any;
  readonly rootURL ="http://localhost:56391/api/";
    dataSource: any;
  constructor(private http : HttpClient) {}
  
  form: FormGroup = new FormGroup({
    ProfilID: new FormControl(null),
    NomProfil: new FormControl('', Validators.required),
   
  
  });
  loadToken(){
    const token = localStorage.getItem('userToken');
   
    this.authToken = token;
  }
  postProfil(formData : Profil){
     
return this.http.post<Profil>(this.rootURL+'profil',formData,{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})}).toPromise();
  }  
  getutl(formData:Profil){
   
    this.form.setValue(formData);
  
  }
  putProfil(formData:Profil){
   
    this.form.setValue(formData);
    return this.http.put<Profil>(this.rootURL+'profil/'+formData.ProfilID,formData,{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})});
      }
      getByID(id:number){
       
        var val="Reading...";
        if(this.list){
            for(var i=0;i<this.list.length;i++){
              if(this.list[i].ProfilID==id){
                val=this.list[i]['NomProfil'];
                
              } }  return val;
            }
                }
      getList() {
        return this.http.get(this.rootURL + 'profil',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})}).toPromise();
      }
      getListtable() {
        return this.http.get(this.rootURL + 'profil',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})});
      }
    refreshList(){
      this.loadToken();
  
   
      this.http.get(this.rootURL+'profil',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})})
      .toPromise().then(res => this.list = res as Profil[]);
     
     return this.http.get(this.rootURL+'profil',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})})
     .toPromise();
   
   }
 
   
   deleteProfil(formData:Profil){
    
  this.http.delete<Profil>(this.rootURL+'profil/'+formData.ProfilID,{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})}).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
   
    return this.refreshList();
  }

  initializeFormGroup() {
    this.form.setValue({
      ProfilID: null,
      NomProfil: '',
     
    });
  }
}
