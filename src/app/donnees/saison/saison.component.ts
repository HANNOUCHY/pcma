
import { Component, OnInit, Inject } from '@angular/core';
import { SaisonService } from '../../shared/saison.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';

import { Router } from '@angular/router';
import { Saison } from 'src/app/shared/saison.model';

import { Location } from '@angular/common';
@Component({
  selector: 'app-saison',
  templateUrl: './saison.component.html',
  styleUrls: ['./saison.component.css']
})
export class SaisonComponent implements OnInit {
  dataSource= new MatTableDataSource<Saison>();
 
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef:MatDialog,
    private service : SaisonService, 
    private toastr : ToastrService,
    private dialog:MatDialog,
    private router:Router,
    private location: Location
   ) {
      
     }
   
      onClear() {
       
        this.service.form.reset();
        this.service.initializeFormGroup();
      }
  ngOnInit() {
/*this.service.getList().then(res => this.service.list=res as Saison[]);
if(this.service.formData.SaisonID==null)
    this.resetForm();*/
   
  }
  resetForm(form? : NgForm){
    if(form != null)
    form.resetForm();
    
    this.service.formData = {
    SaisonID:null,
    NomSaison :'',
    
    }
  }
  
  onSubmit(form : NgForm){
    console.log(this.service.form.get('SaisonID').value);
    if (this.service.form.valid)
    if (!this.service.form.get('SaisonID').value)
    this.insertRecord(form)
    else
    this.updateRecord(form);
    this.service.form.reset();
      this.service.initializeFormGroup();
    this.dialogRef.closeAll()
    location.reload();
    
  }

  insertRecord(form : NgForm){
  
    
this.service.postSaison(this.service.form.value).then((data: any) =>{ 
  this.dataSource.data=data;
  
  this.toastr.success('Inserted Successfully','EMP.Register');
  this.service.refreshList();
  
  this.resetForm(form)});

  }
  updateRecord(form : NgForm){
    
    this.service.putSaison(this.service.form.value).subscribe(res =>{ 
      this.service.refreshList().then((data: any) => {
        this.dataSource.data=data;
            });
      this.resetForm(form)});
     
      this.toastr.info('Update Successfully','EMP.Register');
     
    }
    onClose() {
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.dialogRef.closeAll();
    }

   
}
