import { Injectable, ViewChild } from '@angular/core';
import { Dossier } from './dossier.model';
import { Action } from './action.model';
import {HttpClient, HttpHeaders}from "@angular/common/http";
import * as _ from 'lodash';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from 'rxjs';
import {MatPaginator,MatTableDataSource, MatSort } from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class DossierService {
  formData:Dossier;
  formDataa:Action;
  listD :Dossier[]; 
  list :Action[]; 
  data:any;
  readonly rootURL ="http://localhost:56391/api/";
   
  constructor(private http : HttpClient) {}
  displayedColumns:string[] = ['DossierID','NomJoueur','NomClub','NomUtilisateur','Etat','action'];
 
  dataSource= new MatTableDataSource<Dossier>();
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  form: FormGroup = new FormGroup({
    DossierID: new FormControl(null),
    NomDossier: new FormControl('', Validators.required),
    EmailDossier: new FormControl('', Validators.required),
    TelDossier: new FormControl('', Validators.required),
    CompetitionID: new FormControl(null),
  
  });
  
  postDossier(formDataa : Action){
    console.log(formDataa);

    this.data=this.http.post<Action>(this.rootURL+'Action',formDataa,{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})});

    return this.data.toPromise();
  } 
  postDossier_(formData : Dossier){
    

    console.log(formData);
    this.data=this.http.post<Dossier>(this.rootURL+'Dossier',formData,{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})}).toPromise();

    return this.data;
  }
  
  getDossier():Observable<any>{
    if((localStorage.getItem('profil')=='11') || (localStorage.getItem('profil')=='9'))
    this.data = this.http.get(this.rootURL + 'Dossier',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})});
    else
    this.data = this.http.get(this.rootURL + 'DossierM/'+localStorage.getItem('IdInt'),{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})});
   
   return this.data;  
  
  }
uploadFile(iddossier: string, fileToUpload: File) {
 /* console.log('tes');
  const formData1: FormData = new FormData();
  formData1.append('Image', fileToUpload, fileToUpload.name);
  formData1.append('id', iddossier);
  var res =this.http.post(this.rootURL + 'File',formData1,{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})});
 console.log(res);
  return res.toPromise();*/

}
  getutl(formData:Dossier){
   
    this.form.setValue(formData);
  
  }
  getListC(id) {
       
    return this.http.get(this.rootURL + 'Categorie/'+id,{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})}).toPromise();
  }
  putDossier(formData:Action){
    
    this.form.setValue(formData);
    this.data=this.http.put<Dossier>(this.rootURL+'Action/'+formData.ActionID,formData);
    return this.data;
      }
      getByID(id:number){
       
        var val="Aucun";
            for(var i=0;i<this.list.length;i++){
              if(this.list[i].ActionID==id){
                val=this.list[i]['NomDossier'];
                
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
      getList(id) {
        return this.http.get(this.rootURL + 'Dossier/'+id,{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})}).toPromise();
      }
      getListA(id) {
       
        return this.http.get(this.rootURL + 'Action/'+id,{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})}).toPromise();
      }
      getListtable() {
        return this.http.get(this.rootURL + 'Dossier',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})});
      }
    refreshList(){
      this.http.get(this.rootURL+'Dossier',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})})
      .toPromise().then(res => this.list = res as Action[] );
     
     return this.http.get(this.rootURL+'Dossier',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})})
     .toPromise();
   
   }
 
   
   deleteDossier(formData:Dossier){
    
  this.http.delete<Dossier>(this.rootURL+'Dossier/'+formData.DossierID,{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})}).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
   
    return this.refreshList();
  }



  initializeFormGroup() {
    this.form.setValue({
      ActionID:null,
      CategorieID:null,
      CheckID:null,
      ResAction:"",
     TextAction:""
     
    });
  }
}
