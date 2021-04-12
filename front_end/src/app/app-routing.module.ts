import { NgModule } from '@angular/core';
import { Routes, RouterModule,NavigationEnd } from '@angular/router';
import { DossiersComponent } from './dossiers/dossiers.component';
import { DossierComponent } from './dossiers/dossier/dossier.component';

import { UtilisateurListComponent } from './utilisateurs/utilisateur-list/utilisateur-list.component';
import { ProfilListComponent } from './utilisateurs/profil-list/profil-list.component';
import { SaisonListComponent } from './donnees/saison-list/saison-list.component';
import { CompetitionListComponent } from './donnees/competition-list/competition-list.component';
import { ClubListComponent } from './donnees/club-list/club-list.component';
import {JoueurListComponent} from './donnees/joueur-list/joueur-list.component';
import {DossierListComponent} from './dossiers/dossier-list/dossier-list.component';
import {HomelayoutComponent} from './home/homelayout/homelayout.component';
import {LoginComponent} from './home/login/login.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './home/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'home',                       // {1}
    component: HomelayoutComponent,canActivate:[AuthGuard],
      // {2}
    children: [
      {path:'utilisateurs',component:DossiersComponent,canActivate: [role],
      data: {role: 'Admin'}},
      {path:'utilisateur-list',component:UtilisateurListComponent,canActivate: [role],
      data: {role: 'utilisateur'}},
      {path:'dossier-list',component:DossierListComponent,canActivate: [role],
      data: {role: 'listd'}},
      {path:'profil',component:ProfilListComponent,canActivate: [role],
      data: {role: 'profil'}},
      {path:'saison',component:SaisonListComponent,canActivate: [role],
      data: {role: 'saison'}},
      {path:'competition',component:CompetitionListComponent,canActivate: [role],
      data: {role: 'competition'}},
      {path:'joueur',component:JoueurListComponent,canActivate: [role],
      data: {role: 'joueur'}},
      {path:'club',component:ClubListComponent,canActivate: [role],
      data: {role: 'club'}},
      {path:'dossier',component:DossierComponent,canActivate: [role],
      data: {role: 'dossier'}},
     
      {path:'uploadfile',component:UploadfileComponent,canActivate: [role],
      data: {role: 'dossier'}},
      {path:'dashboard',component:DashboardComponent,canActivate: [role],
      data: {role: 'dashboard'}},
      {path:'dossier/:id',component:DossierComponent,canActivate: [role],
      data: {role: 'dossier'}},
    ]
  },
  {
    path: 'login',
    component: SignInComponent, // {4}
    children: [
      {
        path: 'login',
        component: SignInComponent   // {5}
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
