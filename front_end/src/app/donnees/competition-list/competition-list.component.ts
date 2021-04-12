import { Component, OnInit, ViewChild,Injectable  } from '@angular/core';
import { CompetitionService } from '../../shared/competition.service';

import { ToastrService } from 'ngx-toastr';
import { Competition } from 'src/app/shared/competition.model';
import { MatDialog, MatDialogConfig,MatPaginator,MatTableDataSource, MatSort } from '@angular/material';

import { CompetitionComponent } from '../competition/competition.component';
import { SaisonService } from 'src/app/shared/saison.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-competition-list',
  templateUrl: './competition-list.component.html',
  styleUrls: ['./competition-list.component.css']
})
export class CompetitionListComponent implements OnInit {

  constructor(private service : CompetitionService,private servicesaison : SaisonService,private dialog:MatDialog,private toastr : ToastrService) { }
  displayedColumns:string[] = ['CompetitionID','NomCompetition','NomSaison','action'];
  dataSource= new MatTableDataSource<Competition>();
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  searchKey:string;
  myData: Array < any > ;
  public var:string;
 
  ngOnInit() {
    this.servicesaison.refreshList();
    this.service.getCompetition().subscribe(
      
      list => {
       
        let array = list.map(item => {
        let NomSaison=this.servicesaison.getByID(item["SaisonID"]);
          return {
            NomSaison,
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
  populateForm(atr : Competition){ 
    this.service.formData=Object.assign({},atr);
  }
 
  AddOrEditOrderItem(){
 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="50%";
  
this.dialog.open(CompetitionComponent,dialogConfig);

  }
  onEdit(row){
    
    this.service.pform(row);
   const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
   /* dialogConfig.data=row;
    this.service.getutl(row); */
    this.dialog.open(CompetitionComponent,dialogConfig);  
    
  }
  onDelete(row){
    if(confirm('Are you sure to delete this record ?')){
      
    this.service.deleteCompetition(row).then((data: any) => {
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
