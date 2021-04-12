import { Injectable, ViewChild } from '@angular/core';
import { Club } from './club.model';
import {HttpClient, HttpHeaders}from "@angular/common/http";
import * as _ from 'lodash';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from 'rxjs';
import {MatPaginator,MatTableDataSource, MatSort } from '@angular/material';
import { SaisonService } from './saison.service';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  formData:Club;
  list :Club[]; 
  data:any;
  readonly rootURL ="http://localhost:56391/api/";
   
  constructor(private http : HttpClient,private servicesaison : SaisonService) {}
  displayedColumns:string[] = ['ClubID','NomClub','NomCompetition','action'];
  dataSource= new MatTableDataSource<Club>();
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  form: FormGroup = new FormGroup({
    ClubID: new FormControl(null),
    NomClub: new FormControl('', Validators.required),
    EmailClub: new FormControl('', Validators.required),
    TelClub: new FormControl('', Validators.required),
    CompetitionID: new FormControl(null),
    MedecinID: new FormControl(null),
  });
  
  postClub(formData : Club){
    this.data=this.http.post<Club>(this.rootURL+'club',formData,{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})});
console.log(this.data);
return this.data.toPromise();
  }  
  getClub():Observable<any>{
    this.data = this.http.get(this.rootURL + 'club',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})});
    
   return this.data;  
  
  }

  getutl(formData:Club){
   
    this.form.setValue(formData);
  
  }
  putClub(formData:Club){
    
    this.form.setValue(formData);
    this.data=this.http.put<Club>(this.rootURL+'club/'+formData.ClubID,formData,{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})});
    return this.data;
      }
      getByID(id:number){
       
   
        var val="Reading...";
        if(this.list){
            for(var i=0;i<this.list.length;i++){
              if(this.list[i].ClubID==id){
                val=this.list[i]['NomClub'];
                
              } } } return val;
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
        return this.http.get(this.rootURL + 'club',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})}).toPromise();
      }
      getListtable() {
        return this.http.get(this.rootURL + 'club',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})});
      }
    refreshList(){
      this.http.get(this.rootURL+'Club',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})})
      .toPromise().then(res => this.list = res as Club[] );
     
     return this.http.get(this.rootURL+'Club',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})})
     .toPromise();
   
   }
 
   
   deleteClub(formData:Club){
    
  this.http.delete<Club>(this.rootURL+'Club/'+formData.ClubID,{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})}).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
   
    return this.refreshList();
  }
pform(Clubs){

  this.form.setValue(_.omit(Clubs,'NomCompetition'));
  
}
  initializeFormGroup() {
    this.form.setValue({
      ClubID:null,
      NomClub:"",
      EmailClub:"",
     TelClub:"",
      CompetitionID:null,
      MedecinID:null
    });
  }
}
