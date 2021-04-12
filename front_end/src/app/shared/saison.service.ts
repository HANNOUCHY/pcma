import { Injectable } from '@angular/core';
import { Saison } from './saison.model';
import {HttpClient, HttpHeaders}from "@angular/common/http";
import * as _ from 'lodash';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class SaisonService {
  formData:Saison;
  list :Saison[]; 
  data:any;
  val:string;
  readonly rootURL ="http://localhost:56391/api/";
    dataSource: any;
  constructor(private http : HttpClient) {

 
  }
  
  form: FormGroup = new FormGroup({
    SaisonID: new FormControl(null),
    NomSaison: new FormControl('', Validators.required),
   
  
  });
  
  postSaison(formData : Saison){
    
return this.http.post<Saison>(this.rootURL+'Saison',formData,{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})}).toPromise();
  }  
  getutl(formData:Saison){
   
    this.form.setValue(formData);
  
  }
  putSaison(formData:Saison){
   
    this.form.setValue(formData);
    return this.http.put<Saison>(this.rootURL+'Saison/'+formData.SaisonID,formData,{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})});
      }
      getByID(id:number){
    var val="Aucun";
        for(var i=0;i<this.list.length;i++){
          if(this.list[i].SaisonID==id){
            val=this.list[i]['NomSaison'];
      
          } }  return val;
     /*   var subject = new Subject<string>();
     this.http.get<Saison>(this.rootURL+'Saison/'+id).subscribe((res:any) => {
     this.list=res;
    this.val="";
     for(var i=0;i<this.list.length;i++){
       if(this.list[i].SaisonID==id){
      this.formData=Object.assign({},this.list[i]);
      this.val= this.formData['NomSaison'];
      subject.next(this.val);} }
     
              });*/
    

    
             
       
            }
      getList() {
        return this.http.get(this.rootURL + 'Saison',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})}).toPromise();
      }
      getListtable() {
        return this.http.get(this.rootURL + 'Saison',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})});
      }
    refreshList(){
      this.http.get(this.rootURL+'Saison',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})})
      .toPromise().then(res => this.list = res as Saison[]);
     
     return this.http.get(this.rootURL+'Saison',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})})
     .toPromise();
   
   }
 
   
   deleteSaison(formData:Saison){
    
  this.http.delete<Saison>(this.rootURL+'saison/'+formData.SaisonID,{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})}).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
   
    return this.refreshList();
  }
  getNomSaison($key){
    if ($key == "0")
    return "";
  else{
    return _.find(this.list, (obj) => { return obj.$key == $key; })['NomSaison'];
  } 
  }
  initializeFormGroup() {
    this.form.setValue({
      SaisonID: null,
      NomSaison: '',
     
    });
  }
}
