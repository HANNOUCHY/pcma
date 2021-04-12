
import { Component, OnInit, Inject,ChangeDetectorRef } from '@angular/core';
import { JoueurService } from '../../shared/joueur.service';
import { ClubService } from '../../shared/club.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';

import { Joueur } from 'src/app/shared/joueur.model';
import { Club } from 'src/app/shared/club.model';

@Component({
  selector: 'app-joueur',
  templateUrl: './joueur.component.html',
  styleUrls: ['./joueur.component.css']
})
export class JoueurComponent implements OnInit {
  dataSource= new MatTableDataSource<Joueur>();
  dataSourceClub= new MatTableDataSource<Club>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef:MatDialog,
    private service : JoueurService,
    private servClub : ClubService,
    private toastr : ToastrService,


   ) {
      
     }
   
  
  ngOnInit() {
    this.service.refreshList();
    this.servClub.refreshList().then((data: any) => {
      this.dataSourceClub.data=data;
    
          });

  }
  resetForm(){
    
    
    this.service.formData = {
      JoueurID :null,
      NomJoueur :"",
     PrenomJoueur :"",
      DatenJoueur :"01/01/2000",
     EmailJoueur :"",
     GsmJoueur :"",
     PosteJoueur:"",
     LateralisationJoueur:"",
     PhotoJoueur:"",
     ClubID :null,
    }
  }
  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('JoueurID').value)
        this.service.postJoueur(this.service.form.value).then((data: any) =>{ 
          this.dataSource.data=data;
        });
      else
      this.service.putJoueur(this.service.form.value).subscribe(res =>{ 
        this.service.getJoueur();
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
