import { Component, OnInit, ViewChild,Injectable  } from '@angular/core';
import { DossierService } from '../../shared/dossier.service';

import { ToastrService } from 'ngx-toastr';
import { Dossier } from 'src/app/shared/dossier.model';
import { MatDialog, MatDialogConfig,MatPaginator,MatTableDataSource, MatSort } from '@angular/material';

import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { JoueurService } from 'src/app/shared/joueur.service';
import { ClubService } from 'src/app/shared/club.service';
import { UtilisateurService } from 'src/app/shared/utilisateur.service';

import * as _ from 'lodash';
import { Router } from '@angular/router';
import { retryWhen } from 'rxjs/operators';
import { ConfirmationService } from 'src/app/shared/Confirmation.service';
@Component({
  selector: 'app-dossier-list',
  templateUrl: './dossier-list.component.html',
  styleUrls: ['./dossier-list.component.css']
})
export class DossierListComponent implements OnInit {

  constructor(private router : Router,private service : DossierService,private serviceJoueur : JoueurService,private serviceUtilisateur : UtilisateurService,private serviceClub : ClubService,private dialog:MatDialog,private toastr : ToastrService,private serviceconf : ConfirmationService) { }
  displayedColumns:string[] = ['DossierID','NomJoueur','NomClub','NomUtilisateur','Etat','action'];
  dataSource= new MatTableDataSource<Dossier>();
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  searchKey:string;

  myData: Array < any > ;
  public var:string;
 profil:any;
  ngOnInit() {
    this.profil=localStorage.getItem('profil');
    this.serviceJoueur.refreshList();
    this.serviceClub.refreshList();
    this.serviceUtilisateur.refreshList();
    this.serviceconf.refreshList();
    this.service.getDossier().subscribe(
      
      list => {
       
        let array = list.map(item => {
        let NomJoueur=this.serviceJoueur.getByID(item["JoueurID"]);
        let NomClub=this.serviceClub.getByID(item["ClubID"]);
       // let NomUtilisateur=this.serviceUtilisateur.getByID(item["MedecinID"]);
        let NomUtilisateur=this.serviceUtilisateur.getByID(item["MedecinID"]);
       
        let Confirmation=this.serviceconf.getByID(item["DossierID"]);
          return {
            NomJoueur,
            NomClub,
            NomUtilisateur,
            Confirmation,
            ...item
           
           
          };
        });
      
        this.service.dataSource = new MatTableDataSource(array);
        this.dataSource=this.service.dataSource;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
          });
        };
      });
  }
  Role(){
    var res=true;

    if(this.profil==6){
res=false;
    }
    return res;
  }
  populateForm(atr : Dossier){ 
    this.service.formData=Object.assign({},atr);
  }
 
  AddOrEditOrderItem(){
    window.location.href = 'home/dossier/';
  }
  onEdit(row){
   window.location.href = 'home/dossier/'+row.DossierID;

    
  }
  onView(row){
    
    const dialogConfig = new MatDialogConfig();
     dialogConfig.disableClose = true;
     dialogConfig.autoFocus = true;
     dialogConfig.width = "60%";
     dialogConfig.data=row;
     console.log(dialogConfig.data.DossierID);
     this.serviceconf.getutl(row);
     this.dialog.open(ConfirmationComponent,dialogConfig);   
     
   }

  onDelete(row){
    if(confirm('Are you sure to delete this record ?')){
      
    this.service.deleteDossier(row).then((data: any) => {
   this.ngOnInit();
          });
    this.toastr.warning('! Deleted successfully');
    }}
 
  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }
  applyFilter(){
    this.service.dataSource.filter=this.searchKey.trim().toLowerCase();
  }

}
