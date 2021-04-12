import { Component, OnInit, ViewChild } from '@angular/core';
import { SaisonService } from '../../shared/saison.service';

import { ToastrService } from 'ngx-toastr';
import { Saison } from 'src/app/shared/saison.model';
import { MatDialog, MatDialogConfig,MatPaginator,MatTableDataSource, MatSort } from '@angular/material';

import { SaisonComponent } from '../saison/saison.component';


@Component({
  selector: 'app-Saison-list',
  templateUrl: './Saison-list.component.html',
  styleUrls: ['./Saison-list.component.css']
})
export class SaisonListComponent implements OnInit {

  constructor(private service : SaisonService,private dialog:MatDialog,private toastr : ToastrService) { }
  displayedColumns:string[] = ['SaisonID','NomSaison','action'];
  dataSource= new MatTableDataSource<Saison>();
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
  populateForm(atr : Saison){ 
    this.service.formData=Object.assign({},atr);
  }
  /*onDelete(id : number){
    if(confirm("are you sur ?")){
  this.service.deleteSaison(id).subscribe(res =>{
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
this.dialog.open(SaisonComponent,dialogConfig);

  }
  onEdit(row){
   const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data=row;
    this.service.getutl(row);
    this.dialog.open(SaisonComponent,dialogConfig);   
    
  }
  onDelete(row){
    if(confirm('Are you sure to delete this record ?')){
      
    this.service.deleteSaison(row).then((data: any) => {
      console.log(data);
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
