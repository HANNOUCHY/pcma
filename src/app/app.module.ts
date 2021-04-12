import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import {DataTableModule} from "angular-6-datatable";
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { UtilisateurComponent } from './utilisateurs/utilisateur/utilisateur.component';
import { UtilisateurListComponent } from './utilisateurs/utilisateur-list/utilisateur-list.component';
import { UtilisateurService } from './shared/utilisateur.service';
import {HttpClientModule} from "@angular/common/http";
import { MatFileUploadModule } from '../lib/matFileUpload.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule, MatCommonModule, MatStepperModule} from '@angular/material';
import { ToastrModule } from 'ngx-toastr';
import { ParametreComponent } from './parametre/parametre.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule,MatCardModule,MatMenuModule,MatProgressSpinnerModule,MatFormFieldModule,MatSelectModule,MatCheckboxModule,MatNativeDateModule,MatRadioModule,MatDatepickerModule,MatInputModule,MatRippleModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule,MatTableModule,MatSortModule,MatGridListModule } from '@angular/material';
import { DossiersComponent } from './dossiers/dossiers.component';

import { DossierComponent } from './dossiers/dossier/dossier.component';

import { DossierListComponent } from './dossiers/dossier-list/dossier-list.component';
import { ProfilComponent } from './utilisateurs/profil/profil.component';
import { ProfilListComponent } from './utilisateurs/profil-list/profil-list.component';
import { ProfilService } from './shared/profil.service';
import { DonneesComponent } from './donnees/donnees.component';
import { SaisonComponent } from './donnees/saison/saison.component';
import { SaisonListComponent } from './donnees/saison-list/saison-list.component';
import { SaisonService } from './shared/saison.service';
import { CompetitionComponent } from './donnees/competition/competition.component';
import { CompetitionListComponent } from './donnees/competition-list/competition-list.component';

import { DatePipe } from '@angular/common';
import { JoueurComponent } from './donnees/joueur/joueur.component';
import { JoueurService } from './shared/joueur.service';
import { clubComponent } from './donnees/club/club.component';
import { ClubListComponent } from './donnees/club-list/club-list.component';
import { JoueurListComponent } from './donnees/joueur-list/joueur-list.component';
import { CompetitionService } from './shared/competition.service';
import { ClubService } from './shared/club.service';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { HomelayoutComponent } from './home/homelayout/homelayout.component';
import { LoginComponent } from './home/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { ConfirmationComponent } from './dossiers/confirmation/confirmation.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { PcmaComponent } from './dossiers/pcma/pcma.component';

@NgModule({
  declarations: [
    AppComponent,
    UtilisateursComponent,
    UtilisateurComponent,
    UtilisateurListComponent,
    ParametreComponent,
    DossiersComponent,
    DossierComponent,
    ConfirmationDialogComponent,
    DossierListComponent,
    ProfilComponent,
    ProfilListComponent,
    DonneesComponent,
    SaisonComponent,
    SaisonListComponent,
    CompetitionComponent,
    CompetitionListComponent,
    JoueurComponent,
    clubComponent,
    ClubListComponent,
    JoueurListComponent,
    UserComponent,
    SignInComponent,
    HomelayoutComponent,
    LoginComponent,
    DashboardComponent,
    ConfirmationComponent,
    UploadfileComponent,
    PcmaComponent
 
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatStepperModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    DataTableModule,
    MatDialogModule,
    CdkTableModule,
    MatProgressSpinnerModule,
    CdkTreeModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatRippleModule,
    MatNativeDateModule,
    MatSortModule,
    MatRadioModule,
    MatSelectModule,
    MatGridListModule,
    MatCheckboxModule,
    MatCommonModule,
    MatMenuModule,
    MatFileUploadModule
   

  ],
  entryComponents:[UtilisateurComponent,ProfilComponent,SaisonComponent,CompetitionComponent,clubComponent,JoueurComponent,ConfirmationComponent,ConfirmationDialogComponent],
  providers: [UtilisateurService,ProfilService,SaisonService,CompetitionService,ClubService,JoueurService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
