
import { Component, OnInit, Inject,ChangeDetectorRef } from '@angular/core';
import { UtilisateurService } from '../../shared/utilisateur.service';
import { ProfilService } from '../../shared/profil.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';

import { Utilisateur } from 'src/app/shared/utilisateur.model';
import { Profil } from 'src/app/shared/profil.model';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {
  dataSource= new MatTableDataSource<Utilisateur>();
  dataSourceProfil= new MatTableDataSource<Profil>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef:MatDialog,
    private service : UtilisateurService,
    private servProfil : ProfilService,
    private toastr : ToastrService,


   ) {
      
     }
   
  
  ngOnInit() {
    this.service.refreshList();
    this.servProfil.refreshList().then((data: any) => {
      this.dataSourceProfil.data=data;
    
          });

  }
  resetForm(form? : NgForm){
  
    this.service.formData = {
    UtilisateurID:null,
    NomUtilisateur :'',
    PrenomUtilisateur :'',
    MdpUtilisateur :'',
    EmailUtilisateur :'',
    GsmUtilisateur :'',
    LoggedOn :'',
    ProfilUtilisateur :null,
    }
  }
  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('UtilisateurID').value)
        this.service.postUtilisateur(this.service.form.value).then((data: any) =>{ 
          this.dataSource.data=data;
        });
      else
      this.service.putUtilisateur(this.service.form.value).subscribe(res =>{ 
        this.service.getUtilisateur();
      });
      this.service.form.reset();
      this.service.initializeFormGroup();     
      this.toastr.success(':: Submitted successfully');
      this.onClose();
      
    }
  }
  
 
    onClose() {
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.dialogRef.closeAll();
    }

   
}
