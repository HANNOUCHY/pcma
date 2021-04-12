import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfilService } from '../../shared/profil.service';

import { ToastrService } from 'ngx-toastr';
import { Profil } from 'src/app/shared/profil.model';
import { MatDialog, MatDialogConfig,MatPaginator,MatTableDataSource, MatSort } from '@angular/material';

import { ProfilComponent } from '../profil/profil.component';


@Component({
  selector: 'app-profil-list',
  templateUrl: './profil-list.component.html',
  styleUrls: ['./profil-list.component.css']
})
export class ProfilListComponent implements OnInit {

  constructor(private service : ProfilService,private dialog:MatDialog,private toastr : ToastrService) { }
  displayedColumns:string[] = ['ProfilID','NomProfil','action'];
  dataSource= new MatTableDataSource<Profil>();
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  searchKey:string;


  ngOnInit() {
    this.service.refreshList().then((data: any) => {
      this.dataSource.data=data;
          });
          this.dataSource.sort=this.sort;
          this.dataSource.paginator=this.paginator;
  }
  populateForm(atr : Profil){ 
    this.service.formData=Object.assign({},atr);
  }
  /*onDelete(id : number){
    if(confirm("are you sur ?")){
  this.service.deleteProfil(id).subscribe(res =>{
    this.service.refreshList();
    this.toastr.warning('Delete Successfully','EMP.Register');
  })
    }
  }*/
  AddOrEditOrderItem(itemIndex,Id){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="50%";
    dialogConfig.data={itemIndex,Id};
    this.service.formData = Object.assign({},  this.service.list[itemIndex]);
this.dialog.open(ProfilComponent,dialogConfig);

  }
  onEdit(row){
   const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data=row;
    this.service.getutl(row);
    this.dialog.open(ProfilComponent,dialogConfig);   
    
  }

  onDelete(row){
    if(confirm('Are you sure to delete this record ?')){
      
    this.service.deleteProfil(row).then((data: any) => {
      this.dataSource.data=data;
          });
    this.toastr.warning('! Deleted successfully');
    }}
  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }
  applyFilter(){
    this.dataSource.filter=this.searchKey.trim().toLowerCase();
  }

}
