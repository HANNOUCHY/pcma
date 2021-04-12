import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource,MatPaginator } from '@angular/material';
import { Commission } from 'src/app/shared/commission.model';
import { CommissionService } from 'src/app/shared/commission.service';

@Component({
  selector: 'app-commission',
  templateUrl: './commission.component.html',
  styleUrls: ['./commission.component.css']
})
export class CommissionComponent implements OnInit {
  displayedColumns = ['Customer', 'Address', 'InvoiceNumber', 'AmountUnavailable','AmountAvailable', 'InvoiceLink'];
  dataSource= new MatTableDataSource<Commission>();
  TotalUnpai:any=null;
  TotalCommisssions:any=null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private service : CommissionService) { }

  ngOnInit() {
    this.service.getCommissions().then((data: any) => {
    
      this.dataSource=data;
console.log( this.dataSource);

          });
          
       
  }
Amount(element,available){
  if(element.IsAvailable==available)
return element.Amount;


}

}