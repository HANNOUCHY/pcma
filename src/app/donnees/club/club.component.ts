
import { Component, OnInit, Inject,ChangeDetectorRef } from '@angular/core';
import { ClubService } from '../../shared/club.service';
import { CompetitionService } from '../../shared/competition.service';
import { UtilisateurService } from '../../shared/utilisateur.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';

import { Club } from 'src/app/shared/club.model';

import { Competition } from 'src/app/shared/Competition.model';
import { Utilisateur } from 'src/app/shared/utilisateur.model';
@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class clubComponent implements OnInit {
  dataSource= new MatTableDataSource<Club>();
  dataSourceCompetition= new MatTableDataSource<Competition>();
  dataSourceUtilisateur= new MatTableDataSource<Utilisateur>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef:MatDialog,
    private service : ClubService,
    private servCompetition : CompetitionService,
    private toastr : ToastrService,
    private servUtilisateur: UtilisateurService,

   ) {
      
     }
   
  
  ngOnInit() {
    this.service.refreshList();
    this.servCompetition.refreshList().then((data: any) => {
      this.dataSourceCompetition.data=data;
    
          });
          this.servUtilisateur.refreshList().then((data: any) => {
            this.dataSourceUtilisateur.data=data;
          
                });

  }
  resetForm(){
    
    
    this.service.formData = {
     ClubID:null,
      NomClub:"",
      EmailClub:"",
      TelClub:"",
      CompetitionID:null,
      MedecinID:null
    }
  }
  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('ClubID').value)
        this.service.postClub(this.service.form.value).then((data: any) =>{ 
          this.dataSource.data=data;
        });
      else
      this.service.putClub(this.service.form.value).subscribe(res =>{ 
        this.service.getClub();
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
