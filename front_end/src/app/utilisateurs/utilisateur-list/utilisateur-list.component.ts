import { Component, OnInit, ViewChild,Injectable  } from '@angular/core';
import { UtilisateurService } from '../../shared/utilisateur.service';

import { ToastrService } from 'ngx-toastr';
import { Utilisateur } from 'src/app/shared/utilisateur.model';
import { MatDialog, MatDialogConfig,MatPaginator,MatTableDataSource, MatSort } from '@angular/material';

import { UtilisateurComponent } from '../utilisateur/utilisateur.component';
import { ProfilService } from 'src/app/shared/profil.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-utilisateur-list',
  templateUrl: './utilisateur-list.component.html',
  styleUrls: ['./utilisateur-list.component.css']
})
export class UtilisateurListComponent implements OnInit {

  constructor(private service : UtilisateurService,private serviceProfil : ProfilService,private dialog:MatDialog,private toastr : ToastrService) { }
  displayedColumns:string[] = ['UtilisateurID','NomUtilisateur','EmailUtilisateur','NomProfil','action'];
  dataSource= new MatTableDataSource<Utilisateur>();
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  searchKey:string;
  myData: Array < any > ;
  public var:string;
 
  ngOnInit() {
    this.serviceProfil.refreshList();
    this.service.getUtilisateur().subscribe(
      
      list => {
       
        let array = list.map(item => {
        let NomProfil=this.serviceProfil.getByID(item["ProfilUtilisateur"]);
          return {
            NomProfil,
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
  populateForm(atr : Utilisateur){ 
    this.service.formData=Object.assign({},atr);
  }
 
  AddOrEditOrderItem(){
 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="50%";
  
this.dialog.open(UtilisateurComponent,dialogConfig);

  }
  onEdit(row){
   
    this.service.pform(row);
   const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
   /* dialogConfig.data=row;
    this.service.getutl(row); */
    this.dialog.open(UtilisateurComponent,dialogConfig);  
    
  }
  onDelete(row){
    if(confirm('Are you sure to delete this record ?')){
      
    this.service.deleteUtilisateur(row).then((data: any) => {
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
