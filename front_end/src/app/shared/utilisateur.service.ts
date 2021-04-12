import { Injectable, ViewChild } from '@angular/core';
import { Utilisateur } from './utilisateur.model';
import {HttpClient, HttpHeaders}from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from 'rxjs';
import {MatPaginator,MatTableDataSource, MatSort } from '@angular/material';
import { ProfilService } from './profil.service';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  formData:Utilisateur;
  list :Utilisateur[]; 
  data:any;
  public nom:string;
  readonly rootURL ="http://localhost:56391/api/";
   
  constructor(private http : HttpClient,private serviceProfil : ProfilService) {}
  displayedColumns:string[] = ['UtilisateurID','NomUtilisateur','NomProfil','action'];
  dataSource= new MatTableDataSource<Utilisateur>();
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  form: FormGroup = new FormGroup({
    UtilisateurID: new FormControl(null),
    NomUtilisateur: new FormControl('', Validators.required),
    PrenomUtilisateur: new FormControl('', Validators.required),
    MdpUtilisateur: new FormControl('', Validators.required),
    LoggedOn: new FormControl(''),
    GsmUtilisateur: new FormControl('', [Validators.required, Validators.minLength(8)]),   
    EmailUtilisateur: new FormControl('',Validators.email),
    ProfilUtilisateur: new FormControl(0),
  
  });

  
  postUtilisateur(formData : Utilisateur){
    console.log(formData);
return this.http.post<Utilisateur>(this.rootURL+'Utilisateur',formData,{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})}).toPromise();
  }  
  getUtilisateur():Observable<any>{
    this.data = this.http.get(this.rootURL + 'Utilisateur',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})});
    
   return this.data;  
  
  }
getNomUtilisateur(id:number){

  this.http.get(this.rootURL + 'GetUserString/'+id,{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})}).toPromise().then(res => {
   this.setNom(res);
  
  });


}

setNom(res:any){
  console.log(res);
this.nom=res;

}
getNom(){
  return this.nom;
}
  getutl(formData:Utilisateur){
   
    this.form.setValue(formData);
  
  }
  putUtilisateur(formData:Utilisateur){
    
    this.form.setValue(formData);
    this.data=this.http.put<Utilisateur>(this.rootURL+'Utilisateur/'+formData.UtilisateurID,formData,{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})});
    return this.data;
      }
      getByID(id:number){
       
        var val="Reading...";
        if(this.list){
            for(var i=0;i<this.list.length;i++){
              if(this.list[i].UtilisateurID==id){
                val=this.list[i]['NomUtilisateur'];
                
              } } } return val;
         /*   var subject = new Subject<string>();
         this.http.get<Profil>(this.rootURL+'Profil/'+id).subscribe((res:any) => {
         this.list=res;
        this.val="";
         for(var i=0;i<this.list.length;i++){
           if(this.list[i].ProfilID==id){
          this.formData=Object.assign({},this.list[i]);
          this.val= this.formData['NomProfil'];
          subject.next(this.val);} }
         
                  });*/
        
    
        
                 
           
                }
      getList() {
        return this.http.get(this.rootURL + 'Utilisateur',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})}).toPromise();
      }
      getListtable() {
        return this.http.get(this.rootURL + 'Utilisateur',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})});
      }
      refreshList(){
        this.http.get(this.rootURL+'UtilisateurP/6',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})})
        .toPromise().then(res => this.list = res as Utilisateur[]);
       
       return this.http.get(this.rootURL+'UtilisateurP/6',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})})
       .toPromise();
     
     }
 
   
   deleteUtilisateur(formData:Utilisateur){
    
  this.http.delete<Utilisateur>(this.rootURL+'Utilisateur/'+formData.UtilisateurID,{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})}).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
   
    return this.refreshList();
  }
pform(Utilisateurs){
  console.log(Utilisateurs);
 this.form.setValue(_.omit(Utilisateurs,'NomProfil'));

}
initializeFormGroup() {
  this.form.setValue({
    UtilisateurID: null,
    NomUtilisateur: '',
    PrenomUtilisateur: '',
    MdpUtilisateur: '',
    GsmUtilisateur: '',
    EmailUtilisateur: '',
    LoggedOn:'',
    ProfilUtilisateur: 0,
   
  });
}
}
