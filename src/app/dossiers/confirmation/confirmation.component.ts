
import { Component, OnInit, Inject } from '@angular/core';
import { ConfirmationService } from '../../shared/Confirmation.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';

import { Router } from '@angular/router';
import { Confirmation1 } from 'src/app/shared/Confirmation1.model';

import { Location } from '@angular/common';
@Component({
  selector: 'app-Confirmation',
  templateUrl: './Confirmation.component.html',
  styleUrls: ['./Confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  dataSource= new MatTableDataSource<Confirmation1>();
 
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef:MatDialog,
    public service : ConfirmationService, 
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
/*this.service.getList().then(res => this.service.list=res as Confirmation[]);
if(this.service.formData.ConfirmationID==null)
    this.resetForm();*/
   
  }
  resetForm(form? : NgForm){
    if(form != null)
    form.resetForm();
    
    this.service.formData = {
      ConfirmationID :null,
      DossierID:null,
      UtilisateurID:null,
      Confirmation1:"",
      DateConfirmation:null
    
    }
  }
  
  onSubmit(form : NgForm){

    //console.log(this.service.form.get('DossierID').value);
    //console.log(this.service.form.get('Confirmation1').value);
    this.service.form.patchValue({
      DossierID:this.service.form.get('DossierID').value,
      UtilisateurID:localStorage.getItem('IdInt'),
      DateConfirmation:Date.now(),
      Confirmation1:this.service.form.get('Confirmation1').value
    })
    //console.log(this.service.form.get('DateConfirmation').value); 
    //console.log(this.service.form.get('DossierID').value);
    console.log(this.service.form.value);
if (this.service.form.valid)
       this.insertRecord(this.service.form.value)
 

      this.service.initializeFormGroup();
    this.dialogRef.closeAll()
    location.reload();
    
  }

  insertRecord(form : NgForm){
  
    
this.service.postConfirmation(this.service.form.value).then((data: any) =>{ 
  this.dataSource.data=data;
  
  this.toastr.success('Inserted Successfully','EMP.Register');
  this.service.refreshList();
  
  this.resetForm(form)});

  }
  updateRecord(form : NgForm){
    
    this.service.putConfirmation(this.service.form.value).subscribe(res =>{ 
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
