import { Component, OnInit, ViewChild} from '@angular/core';
import { JoueurService } from 'src/app/shared/joueur.service';

import { ToastrService } from 'ngx-toastr';
import { Joueur } from 'src/app/shared/joueur.model';
import { MatDialog, MatDialogConfig,MatPaginator,MatTableDataSource, MatSort } from '@angular/material';

import { JoueurComponent } from '../joueur/joueur.component';
import { ClubService } from 'src/app/shared/club.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-joueur-list',
  templateUrl: './joueur-list.component.html',
  styleUrls: ['./joueur-list.component.css']
})
export class JoueurListComponent implements OnInit {

  constructor(private service : JoueurService,private serviceclub : ClubService,private dialog:MatDialog,private toastr : ToastrService) { }
  displayedColumns:string[] = ['JoueurID','NomJoueur','NomClub','action'];
  dataSource= new MatTableDataSource<Joueur>();
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  searchKey:string;
  myData: Array < any > ;
  public var:string;
 
  ngOnInit() {
    this.serviceclub.refreshList();

    this.service.getJoueur().subscribe(
      
      list => {
       
        let array = list.map(item => {
        let NomClub=this.serviceclub.getByID(item["ClubID"]);
          return {
            NomClub,
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
  populateForm(atr : Joueur){ 
    this.service.formData=Object.assign({},atr);
  }
 
  AddOrEditOrderItem(){
 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="50%";
  
this.dialog.open(JoueurComponent,dialogConfig);

  }
  onEdit(row){
    console.log(row);
    this.service.pform(row);
   const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
   /* dialogConfig.data=row;
    this.service.getutl(row); */
    this.dialog.open(JoueurComponent,dialogConfig);  
    
  }
  onDelete(row){
    if(confirm('Are you sure to delete this record ?')){
      
    this.service.deleteJoueur(row).then((data: any) => {
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
