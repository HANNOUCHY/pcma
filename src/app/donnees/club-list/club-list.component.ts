import { Component, OnInit, ViewChild,Injectable  } from '@angular/core';
import { ClubService } from '../../shared/club.service';

import { ToastrService } from 'ngx-toastr';
import { Club } from 'src/app/shared/club.model';
import { MatDialog, MatDialogConfig,MatPaginator,MatTableDataSource, MatSort } from '@angular/material';

import { clubComponent } from '../club/club.component';
import { CompetitionService } from 'src/app/shared/competition.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.css']
})
export class ClubListComponent implements OnInit {

  constructor(private service : ClubService,private servicecomp : CompetitionService,private dialog:MatDialog,private toastr : ToastrService) { }
  displayedColumns:string[] = ['ClubID','NomClub','NomCompetition','action'];
  dataSource= new MatTableDataSource<Club>();
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  searchKey:string;
  myData: Array < any > ;
  public var:string;
 
  ngOnInit() {
    this.servicecomp.refreshList();
    this.service.getClub().subscribe(
      
      list => {
       
        let array = list.map(item => {
          
       let NomCompetition=this.servicecomp.getByID(item["CompetitionID"]);
      
          return {
            NomCompetition,
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
  populateForm(atr : Club){ 
    this.service.formData=Object.assign({},atr);
  }
 
  AddOrEditOrderItem(){
 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="50%";
  
this.dialog.open(clubComponent,dialogConfig);

  }
  onEdit(row){
    console.log(row);
    this.service.pform(row);
    console.log("test");
   const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
   /* dialogConfig.data=row;
    this.service.getutl(row); */
    this.dialog.open(clubComponent,dialogConfig);  
    
  }
  onDelete(row){
    if(confirm('Are you sure to delete this record ?')){
      
    this.service.deleteClub(row).then((data: any) => {
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
