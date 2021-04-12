
import { Component, OnInit, Inject,ChangeDetectorRef } from '@angular/core';
import { CompetitionService } from '../../shared/competition.service';
import { SaisonService } from '../../shared/saison.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';

import { Competition } from 'src/app/shared/competition.model';
import { Saison } from 'src/app/shared/saison.model';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {
  dataSource= new MatTableDataSource<Competition>();
  dataSourceSaison= new MatTableDataSource<Saison>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef:MatDialog,
    private service : CompetitionService,
    private servSaison : SaisonService,
    private toastr : ToastrService,


   ) {
      
     }
   
  
  ngOnInit() {
    this.service.refreshList();
    this.servSaison.refreshList().then((data: any) => {
      this.dataSourceSaison.data=data;
    
          });

  }
  resetForm(){
    
    
    this.service.formData = {
      CompetitionID:null,
      NomCompetition:"",
      RegimeCompetition:"",
      CategorieCompetition:"",
      SaisonID:null,
    }
  }
  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('CompetitionID').value)
        this.service.postCompetition(this.service.form.value).then((data: any) =>{ 
          this.dataSource.data=data;
        });
      else
      this.service.putCompetition(this.service.form.value).subscribe(res =>{ 
        this.service.getCompetition();
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
