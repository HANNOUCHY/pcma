import { Injectable } from '@angular/core';
import { Confirmation1 } from './Confirmation1.model';
import {HttpClient, HttpHeaders}from "@angular/common/http";
import * as _ from 'lodash';
import { FormGroup, FormControl, Validators } from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  formData:Confirmation1;
  list :Confirmation1[]; 
  data:any;
  val:string;
  readonly rootURL ="http://localhost:56391/api/";
    dataSource: any;
  constructor(private http : HttpClient) {

 
  }
  
  form: FormGroup = new FormGroup({
  
    ConfirmationID:new FormControl(null),
      DossierID:new FormControl(null),
      UtilisateurID:new FormControl(null),
      Confirmation1:new FormControl(''),
      DateConfirmation:new FormControl(null),
  
  });
  
  postConfirmation(formData : Confirmation1){
    
return this.http.post<Confirmation1>(this.rootURL+'Confirmation',formData,{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})}).toPromise();
  
}  
  getutl(formData){
this.form.patchValue({
  DossierID:formData.DossierID,
})
    
  
  }
  putConfirmation(formData:Confirmation1){
   
    this.form.setValue(formData);
    return this.http.put<Confirmation1>(this.rootURL+'Confirmation/'+formData.ConfirmationID,formData,{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})});
      }
      getByID(id:number){

      console.log(this.list);
    var val="Aucun";
    if(this.list){
        for(var i=0;i<this.list.length;i++){
          if(this.list[i].DossierID==id){
            val=this.list[i]['Confirmation1'];
      
          } } }  return val;
     /*   var subject = new Subject<string>();
     this.http.get<Confirmation>(this.rootURL+'Confirmation/'+id).subscribe((res:any) => {
     this.list=res;
    this.val="";
     for(var i=0;i<this.list.length;i++){
       if(this.list[i].ConfirmationID==id){
      this.formData=Object.assign({},this.list[i]);
      this.val= this.formData['NomConfirmation'];
      subject.next(this.val);} }
     
              });*/
    

    
             
       
            }
      getList() {
        return this.http.get(this.rootURL + 'Confirmation',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})}).toPromise();
      }
      getListtable() {
        return this.http.get(this.rootURL + 'Confirmation',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})});
      }
    refreshList(){
      this.http.get(this.rootURL+'Confirmation',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})})
      .toPromise().then(res => this.list = res as Confirmation1[]);
    
     return this.http.get(this.rootURL+'Confirmation',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})})
     .toPromise();
   
   }
 
   
   deleteConfirmation(formData:Confirmation1){
    
  this.http.delete<Confirmation1>(this.rootURL+'Confirmation/'+formData.ConfirmationID,{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})}).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
   
    return this.refreshList();
  }
  getNomConfirmation($key){
    if ($key == "0")
    return "";
  else{
    return _.find(this.list, (obj) => { return obj.$key == $key; })['Confirmation1'];
  } 
  }
  initializeFormGroup() {
    this.form.setValue({
      ConfirmationID:null, 
      DossierID:null,
      UtilisateurID:null,
      Confirmation1:"",
      DateConfirmation:null,
     
    });
  }
}
