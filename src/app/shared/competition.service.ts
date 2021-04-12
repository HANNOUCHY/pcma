import { Injectable, ViewChild } from '@angular/core';
import { Competition } from './Competition.model';
import {HttpClient, HttpHeaders}from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from 'rxjs';
import {MatPaginator,MatTableDataSource, MatSort } from '@angular/material';
import { SaisonService } from './saison.service';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  formData:Competition;
  list :Competition[]; 
  data:any;
  readonly rootURL ="http://localhost:56391/api/";
   
  constructor(private http : HttpClient,private servicesaison : SaisonService) {}
  displayedColumns:string[] = ['CompetitionID','NomCompetition','NomSaison','action'];
  dataSource= new MatTableDataSource<Competition>();
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  form: FormGroup = new FormGroup({
    CompetitionID: new FormControl(null),
    NomCompetition: new FormControl('', Validators.required),
    RegimeCompetition: new FormControl('', Validators.required),
    CategorieCompetition: new FormControl('', Validators.required),
    SaisonID:new FormControl(null),
  
  });
  
  postCompetition(formData : Competition){
    console.log(formData);
return this.http.post<Competition>(this.rootURL+'Competition',formData,{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})}).toPromise();
  }  
  getCompetition():Observable<any>{
    this.data = this.http.get(this.rootURL + 'Competition',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})});
    
   return this.data;  
  
  }

  getutl(formData:Competition){
   
    this.form.setValue(formData);
  
  }
  putCompetition(formData:Competition){
    
    this.form.setValue(formData);
    this.data=this.http.put<Competition>(this.rootURL+'Competition/'+formData.CompetitionID,formData,{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})});
    return this.data;
      }
      getByID(id:number){
       
        var val="Aucun";
            for(var i=0;i<this.list.length;i++){
              if(this.list[i].CompetitionID==id){
                val=this.list[i]['NomCompetition'];
                
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
        return this.http.get(this.rootURL + 'Competition',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})}).toPromise();
      }
      getListtable() {
        return this.http.get(this.rootURL + 'Competition',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})});
      }
      refreshList(){
        this.http.get(this.rootURL+'Competition',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})})
        .toPromise().then(res => this.list = res as Competition[]);
       
       return this.http.get(this.rootURL+'Competition',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})})
       .toPromise();
     
     }
 
   
   deleteCompetition(formData:Competition){
    
  this.http.delete<Competition>(this.rootURL+'Competition/'+formData.CompetitionID,{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})}).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
   
    return this.refreshList();
  }
pform(competitions){
  this.form.setValue(_.omit(competitions,'NomSaison'));

}
  initializeFormGroup() {
    this.form.setValue({
      CompetitionID:null,
      NomCompetition:"",
      RegimeCompetition:"",
      CategorieCompetition:"",
      SaisonID:null,
     
    });
  }
}
