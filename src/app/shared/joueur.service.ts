import { Injectable, ViewChild } from '@angular/core';
import { Joueur } from './Joueur.model';
import {HttpClient, HttpHeaders}from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from 'rxjs';
import {MatPaginator,MatTableDataSource, MatSort } from '@angular/material';
import { ClubService } from './club.service';

@Injectable({
  providedIn: 'root'
})
export class JoueurService {
  formData:Joueur;
  list :Joueur[]; 
  data:any;
  readonly rootURL ="http://localhost:56391/api/";
   
  constructor(private http : HttpClient,private serviceclub : ClubService) {}
  displayedColumns:string[] = ['JoueurID','NomJoueur','NomClub','action'];
  dataSource= new MatTableDataSource<Joueur>();
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  form: FormGroup = new FormGroup({
    JoueurID: new FormControl(null),
    NomJoueur: new FormControl('', Validators.required),
    PrenomJoueur :new FormControl('', Validators.required),
    DatenJoueur :new FormControl('', Validators.required),
    EmailJoueur :new FormControl('', Validators.email),
    GsmJoueur :new FormControl('', Validators.required),
    PosteJoueur:new FormControl('', Validators.required),
    LateralisationJoueur:new FormControl('', Validators.required),
    ClubID : new FormControl(null),
    PhotoJoueur:new FormControl('', Validators.required),
  });
 
  postJoueur(formData : Joueur){
    console.log(formData);
return this.http.post<Joueur>(this.rootURL+'Joueur',formData,{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})}).toPromise();
  }  
  getJoueur():Observable<any>{
    this.data = this.http.get(this.rootURL + 'Joueur',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})});
    
   return this.data;  
  
  }

  getutl(formData:Joueur){
   
    this.form.setValue(formData);
  
  }
  putJoueur(formData:Joueur){
    
    this.form.setValue(formData);
    this.data=this.http.put<Joueur>(this.rootURL+'Joueur/'+formData.JoueurID,formData,{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})});
    return this.data;
      }
      getByID(id:number){
       
        var val="Reading...";
        if(this.list){
            for(var i=0;i<this.list.length;i++){
              if(this.list[i].JoueurID==id){
                val=this.list[i]['NomJoueur'];
                
              } }}  return val;
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
      getList(id) {
        return this.http.get(this.rootURL + 'Joueur/'+id,{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})}).toPromise();
      }
      getListtable() {
        return this.http.get(this.rootURL + 'Joueur');
      }
      refreshList(){
       
        this.http.get(this.rootURL+'JoueurM/'+localStorage.getItem('club'),{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})})
        .toPromise().then(res => this.list = res as Joueur[]);
       
       return this.http.get(this.rootURL+'JoueurM/'+localStorage.getItem('club'),{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})})
       .toPromise();
     
     }
 
   
   deleteJoueur(formData:Joueur){
    
  this.http.delete<Joueur>(this.rootURL+'Joueur/'+formData.JoueurID,{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})}).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
   
    return this.refreshList();
  }
pform(Joueurs){
  this.form.setValue(_.omit(Joueurs,'NomClub'));

}
  initializeFormGroup() {
    this.form.setValue({
      JoueurID :null,
      NomJoueur :"",
     PrenomJoueur :"",
      DatenJoueur :"",
     EmailJoueur :"",
     GsmJoueur :"",
     PosteJoueur:"",
     LateralisationJoueur:"",
     ClubID :null,
     PhotoJoueur:"",
    });
  }
}
