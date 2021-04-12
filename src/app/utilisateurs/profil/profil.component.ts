
import { Component, OnInit, Inject } from '@angular/core';
import { ProfilService } from '../../shared/profil.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { inherits } from 'util';
import  { ProfilListComponent } from '../profil-list/profil-list.component';
import { Router } from '@angular/router';
import { Profil } from 'src/app/shared/profil.model';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  dataSource= new MatTableDataSource<Profil>();
 
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef:MatDialog,
    private service : ProfilService,
    
    private toastr : ToastrService,
    private dialog:MatDialog,
    private router:Router,
   ) {
      
     }
   
      onClear() {
       
        this.service.form.reset();
        this.service.initializeFormGroup();
      }
  ngOnInit() {
/*this.service.getList().then(res => this.service.list=res as Profil[]);
if(this.service.formData.ProfilID==null)
    this.resetForm();*/
   
  }
  resetForm(form? : NgForm){
    if(form != null)
    form.resetForm();
    
    this.service.formData = {
    ProfilID:null,
    NomProfil :'',
    
    }
  }
  
  onSubmit(form : NgForm){
    console.log(this.service.form.get('ProfilID').value);
    if (this.service.form.valid)
    if (!this.service.form.get('ProfilID').value)
    this.insertRecord(form)
    else
    this.updateRecord(form);
    this.service.form.reset();
      this.service.initializeFormGroup();
    this.dialogRef.closeAll()
    
  }

  insertRecord(form : NgForm){
  
    
this.service.postProfil(this.service.form.value).then((data: any) =>{ 
  this.dataSource.data=data;
  this.toastr.success('Inserted Successfully','EMP.Register');
  this.service.refreshList();
  
  this.resetForm(form)});

  }
  updateRecord(form : NgForm){
    
    this.service.putProfil(this.service.form.value).subscribe(res =>{ 
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
