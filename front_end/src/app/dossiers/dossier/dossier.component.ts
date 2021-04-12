import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import { MatTableDataSource, MatCheckbox } from '@angular/material';
import { shouldCallLifecycleInitHook } from '@angular/core/src/view';
import { DossierService } from 'src/app/shared/dossier.service';
import { Dossier } from 'src/app/shared/dossier.model';
import { Action } from 'src/app/shared/action.model';
import { Joueur } from 'src/app/shared/joueur.model';
import { Categorie } from 'src/app/shared/categorie.model';
import { JoueurService } from '../../shared/joueur.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { concat } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/table';
import { ClubService } from 'src/app/shared/club.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-dossier',
  templateUrl: './dossier.component.html',
  styleUrls: ['./dossier.component.css']
})

export class DossierComponent implements OnInit {

  displayedColumns:string[] = ['categorie','Non','oui4','4oui'];
  displayedColumns2:string[] = ['categorie','champs'];
  displayedColumns3:string[] = ['categorie','champs','champs2'];
  dataSourceJoueur= new MatTableDataSource<Joueur>();
  dataSourceDossier= new MatTableDataSource<Dossier>();
  dataSourceAction= new MatTableDataSource<Action>();
  list :Action[]; 
  firstFormGroup: FormGroup;
  FormGroup: FormGroup;
  
  Formarray:FormArray;
 
  dataSource = new MatTableDataSource<Categorie>();
  dataSource1 :[];
  dataSource2 :[];
  dataSource3 = ELEMENT_DATA3;
  dataSource4 = ELEMENT_DATA4;
  dataSource5 :[];
  dataSource6 = ELEMENT_DATA6;
  dataSource7 :[];
  dataSource8 :[];
  dataSource9=ELEMENT_DATA9;
  dataSource10=ELEMENT_DATA10;
  dataSource11=ELEMENT_DATA11;
  dataSource12=ELEMENT_DATA12;
  dataSource13=ELEMENT_DATA13;
  dataSource14=ELEMENT_DATA14;
  dataSource15:[];
  dataSource16:[];
  dataSource17:[];
  dataSource18:[];
  dataSource19:[];
  dataSource20=ELEMENT_DATA20;
  dataSource21:[];
  dataSource22=ELEMENT_DATA22;
  dataSource23=ELEMENT_DATA23;
  dataSource24=ELEMENT_DATA24;
  dataSource25:[];
  dataSource26:[];
  dataSource27:[];
  dataSource28=ELEMENT_DATA28;
  dataSource29:[];
  dataSource30=[];
  dataSource31=ELEMENT_DATA31;
  dataSource32=ELEMENT_DATA32;
  dataSource33:[];
  dataSource34:[];
  dataSource35:[];
  dataSource36=ELEMENT_DATA36;
  dataSource37:[];
  dataSource38:[];
  dataSource39=ELEMENT_DATA39;
  dataSource40:[];
  dataSource41:[];
  dataSource42=ELEMENT_DATA42;
  dataSource43:[];
  dataSource44=[];
  dataSource45=ELEMENT_DATA45;
  dataSource46:[];
  dataSource47:[];
  dataSource48=ELEMENT_DATA48;
  dataSource49=ELEMENT_DATA49;
  dataSource50=ELEMENT_DATA50;
  dataSource51:[];
  dataSource52:[];
  dataSource53:[];
  dataSource54=ELEMENT_DATA54;
  dataSource55=ELEMENT_DATA55;
  dataSource56=ELEMENT_DATA56;
  dataSource57:[];
  dataSource58=ELEMENT_DATA58;
  dataSource59=ELEMENT_DATA59;
  dataSource61=ELEMENT_DATA61;
  dataSource62=ELEMENT_DATA62;
  dataSource63=ELEMENT_DATA63;
  dataSource64=ELEMENT_DATA64;
  dataSource65=ELEMENT_DATA65;
  dataSource66=ELEMENT_DATA66;
  dataSource177=ELEMENT_DATA177;
  dataSource60:[];
  datas=tableCate;
  datasources:[];
  interests:any;
  selected: any;
  dataaction:any;
  typesOfShoes: string[] = ['tête/visage', 'nuque', 'vertèbre thoracique', 'vertèbre lombaire','abdomen','doigts','épaule','bras','coude','poignet','bassin/sacrum','hanche','aine','cuisse','bassin/sacrum','basse jambe','tend. d’Achille','cheville','pied/orteil','hanche (droit)','aine (droit)','cuisse (droit)','genou (droit)','basse jambe (droit)','tend. d’Achille (droit)','cheville (droit)','pied/orteil (droit)','hanche (gauche)','aine (gauche)','cuisse (gauche)','genou (gauche)','basse jambe (gauche)','tend. d’Achille (gauche)','cheville (gauche)','pied/orteil (gauche)'];
  typesOfShoes2: string[] = ['repos', 'physiothérapie', 'chirurgie'];
  typesOfShoes3: string[] = ['Non', 'Père', 'Mère','Frére/soeur','Autre'];
  typesOfShoes4: string[] = ['Non', 'Oui'];
  secondFormGroup: FormGroup;
  secondFormGroup2: FormGroup
  secondFormGroup3: FormGroup;
  secondFormGroup4: FormGroup;
  secondFormGroup5: FormGroup;
  secondFormGroup6: FormGroup;
  formgroupDossier:FormGroup;
  formgroupJoueur:FormGroup;
  formCatTab:FormGroup;
  isOptional = false;
  varl:any;
formdatajoueur=ejoueur;

  constructor(private serviceClub : ClubService,private router : Router,private route : ActivatedRoute,private _formBuilder: FormBuilder,private service : DossierService,private servicejoueur : JoueurService) {}
  onSubmit() {
    
    /*formData1.append('Image', this.fileToUpload, this.fileToUpload.name);
    formData1.append()*/
    this.formgroupDossier.patchValue({
FileDossier:this.fileToUpload.name,
    })
    
   this.service.postDossier_(this.formgroupDossier.value).then((obj) => {
    const val= obj.DossierID;
    this.service.uploadFile(obj.DossierID,this.fileToUpload);
    elm_dt.forEach(obj=>{obj.DossierID=val,this.service.postDossier(obj)})
        });
   

        this.router.navigate(['home/dossier-list']);
 
  }

  changeradio(i,ctrl){
if(i==1){
  let control = this.secondFormGroup.get(ctrl);
  control.enable();
}else{
  let control = this.secondFormGroup.get(ctrl);
  control.disable();
}
  }
  updateChkbxArray(chk, isChecked,matcheck,text) {

    
    if(matcheck==false){
      isChecked=true;
      this.FormGroup.patchValue({
        ActionID:null,
        CategorieID:chk,
       
        ResAction:matcheck,
       TextAction:text,
       DossierID:null
        // formControlName2: myValue2 (can be omitted)
      });
      const index : number = elm_dt.indexOf(this.FormGroup.value);
      elm_dt.splice(index,1);
      
    

    }else if(matcheck==true){
      
      this.FormGroup.patchValue({
        ActionID:null,
        CategorieID:chk,
        CheckID:isChecked,
        ResAction:matcheck,
       TextAction:text,
       DossierID:null
       });
       
       elm_dt.push(this.FormGroup.value);
    }else{
     
     
       
       elm_dt.forEach(function (elm) {
        if(elm.CategorieID==chk){
          if(text!='rad'){
          if(elm.CheckID==isChecked){
            if(matcheck!='text'){
              console.log(elm);
              const index : number = elm_dt.indexOf(elm);
          elm_dt.splice(index,1)

            }
            }}else{
              const index : number = elm_dt.indexOf(elm);
              elm_dt.splice(index,1)

            }
        }
      });
  if(matcheck!=false){
    console.log(isChecked);
      this.FormGroup.patchValue({
        ActionID:null,
        CategorieID:chk,
        CheckID:isChecked,
        ResAction:matcheck,
       TextAction:text,
       DossierID:null
      });
    
       elm_dt.push(this.FormGroup.value);
       
    }}
    
    console.log(elm_dt);
  
}

changejoueur(ctrl){
  if(ejoueur.length!=0){
 ejoueur.splice(0,1)
  }

    let NomClub=this.serviceClub.getByID(ctrl.ClubID);
    
    this.formdatajoueur.push({
     "JoueurID":ctrl.JoueurID,
     "NomJoueur": ctrl.NomJoueur,
     "DatenJoueur": ctrl.DatenJoueur,
     "PrenomJoueur": ctrl.PrenomJoueur,
     "PosteJoueur": ctrl.PosteJoueur,
     "LateralisationJoueur":ctrl.LateralisationJoueur,
     "PhotoJoueur":ctrl.PhotoJoueur,
     "NomClub": NomClub,
   });

   this.formgroupDossier.patchValue({
    DossierID:null,
    JoueurID:ctrl.JoueurID,
    ClubID:ctrl.ClubID,
    MedecinID:localStorage.getItem('IdInt'),
    DateDossier:Date.now(),
  })
}
valued(idcat,idcheck){ 
  console.log("test");
  if(elm_dt){
    for(var i=0;i<elm_dt.length;i++){
      if(elm_dt[i].CategorieID==idcat){
        if(elm_dt[i].CheckID==idcheck){
          console.log(elm_dt[i].TextAction);
         return elm_dt[i].TextAction;  
        }
       
        
      } } }


}
checkedradio(idcat,idcheck){ 
 var res;
 
 if((idcheck=='Oui')||(idcheck=='anormal')||(idcheck=='Possible')){
res=true;
 }
  if(elm_dt){
    for(var i=0;i<elm_dt.length;i++){
      if(elm_dt[i].CategorieID==idcat){
        if(elm_dt[i].ResAction==idcheck){
         
         res=true;  
        }
       
        
      } } }


return res;
}
fileToUpload: File = null;
imageUrl: string = "/assets/img/default-image.png";
handleFileInput(file: FileList) {
  this.fileToUpload = file.item(0);

  //Show image preview
  var reader = new FileReader();
  reader.onload = (event:any) => {
    this.imageUrl = event.target.result;
  }
  reader.readAsDataURL(this.fileToUpload);
}
checked(idcat,idcheck){ 
 
  if(elm_dt){
    for(var i=0;i<elm_dt.length;i++){
      if(elm_dt[i].CategorieID==idcat){
        if(elm_dt[i].CheckID==idcheck){
        
         return true;  
        }
       
        
      } } }



}
Masquer(id){
  var res=true;
  for(var i=0;i<elm_dt.length;i++){
    if(elm_dt[i].CategorieID==id){
      if((elm_dt[i].ResAction=='Non')||(elm_dt[i].ResAction=='normal')||(elm_dt[i].ResAction=='Impossible'))
    res=false;
      
    } } 
    return res;
}
  ngOnInit() {
    console.log(localStorage.getItem('token'));
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl:'',
    AnneeCtrl:'',
    PoidsCtrl:'',
    AutreCtrl:'',
    TailleCtrl:'',
    });
    
for(let i=200;i<501;i++){
    let parm="AutreCtrl_"+i;
     
      this.secondFormGroup.addControl(parm,new FormControl(elm_dt));
}

    for(let i=1;i<34;i++){
    
   
    this.service.getListC(i).then((data: Categorie) => {

    this.Datasource(i,data);
    
   
    })
      }
    
   /* All_tabs.push(DataSource);
    for(let i=1;i<61;i++){

      All_tabs.push(DataSource&&i);
    }
    All_tabs.forEach(ob=>{
    this.secondFormGroup.addControl("AutreCtrl_"+ob.id_categorie,new FormControl(elm_dt));

    })
    this.firstFormGroup.addControl("AutreCtrl_12",new FormControl(elm_dt));*/
   // this.firstFormGroup.controls['AutreCtrl_12'].setValue("123");
    this.formgroupDossier= this._formBuilder.group({
      DossierID:null,
      JoueurID:null,
      ClubID:null,
      MedecinID:1,
      DateDossier:'',
      FileDossier:''
    });
    this.serviceClub.refreshList();
    this.formgroupJoueur= this._formBuilder.group({
      JoueurID :null,
      NomJoueur :'',
     PrenomJoueur :'',
      DatenJoueur :'',
     EmailJoueur :'',
            GsmJoueur :'',
    PosteJoueur:'',
     LateralisationJoueur:'',
     ClubID :'', });
    const iddos=this.route.snapshot.paramMap.get('id');
    if(iddos!=null){
      this.secondFormGroup.disable();
      
      this.service.getList(iddos).then((data: any) => {

        this.servicejoueur.getList(data.JoueurID).then((data: any) => {
          
                let NomClub=this.serviceClub.getByID(data.ClubID);
                
        
               this.formdatajoueur.push({
                "JoueurID":data.JoueurID,
                "NomJoueur": data.NomJoueur,
                "PrenomJoueur": data.PrenomJoueur,
                "DatenJoueur": data.DatenJoueur,
                "PosteJoueur": data.PosteJoueur,
                "LateralisationJoueur":data.LateralisationJoueur,
                "PhotoJoueur":data.PhotoJoueur,
                "NomClub": NomClub,
              });
        })
          
        
          
                });
                this.service.getListA(iddos).then((data: any) => {

                  data.forEach(el=>{     
                    elm_dt.push(el);
                    if(el.ResAction=='text'){
                      
                      let pram='AutreCtrl_'+el.CategorieID;
                     
                       this.secondFormGroup.controls[pram].setValue(el.TextAction);
                    }
                   
                    }) })
                    
   /* this.service.getListA(iddos).then((data: Action) => {
      
      this.dataaction=data;
      console.log(this.dataaction);
      if(data.ResAction=='text'){
       
      this.firstFormGroup.controls['AutreCtrl_'+data.CategorieID].setValue(data.TextAction);
 }
   })*/
 


  

      }
    this.service.refreshList();
    this.servicejoueur.refreshList().then((data: any) => {
      this.dataSourceJoueur.data=data;
    
          });
    

    this.formgroupDossier= this._formBuilder.group({
      DossierID:null,
      JoueurID:null,
      ClubID:null,
      MedecinID:1,
      DateDossier:'',
      FileDossier:''
    
    });
  
    this.firstFormGroup = this._formBuilder.group({
      TailleCtrl:'',
      firstCtrl:'',
      JoueurID:'',
      AutreCtrl_12:'',
    });
  
    this.FormGroup = this._formBuilder.group({
      ActionID:null,
      CategorieID:null,
      CheckID:null,
      ResAction:'',
     TextAction:'',
     DossierID:null,
    
      
    });
  
  
  
    
    /*if(iddos!=null){
      this.secondFormGroup.disable();
      this.secondFormGroup2.disable();
      this.secondFormGroup3.disable();
      this.secondFormGroup4.disable();
      this.secondFormGroup5.disable();
      this.secondFormGroup6.disable();
      this.firstFormGroup.disable();
      }*/
      
  }
  createItem(): FormGroup {
    return this._formBuilder.group({
      id_cat:new FormControl(''),
      id_check:new FormControl(''),
     
    });
  }
  Datasource(i,data){
    if(i==1){this.dataSource=data}
    else if(i==2){this.dataSource1=data}
    else if(i==3){this.dataSource2=data;}
    else if(i==4){this.dataSource15=data}
    else if(i==5){this.dataSource16=data}
    else if(i==6){this.dataSource5=data}
    else if(i==7){this.dataSource17=data}
    else if(i==8){this.dataSource7=data}
    else if(i==9){this.dataSource8=data}
    else if(i==10){this.dataSource18=data}
    else if(i==11){this.dataSource19=data}
    else if(i==12){this.dataSource21=data}
    else if(i==13){this.dataSource25=data}
    else if(i==14){this.dataSource26=data}
    else if(i==15){this.dataSource27=data}
    else if(i==16){this.dataSource29=data}
    else if(i==17){this.dataSource30=data}
    else if(i==18){this.dataSource34=data}
    else if(i==19){this.dataSource33=data}
    else if(i==20){this.dataSource35=data}
    else if(i==21){this.dataSource37=data}
    else if(i==22){this.dataSource38=data}
    else if(i==23){this.dataSource40=data}
    else if(i==24){this.dataSource41=data}
    else if(i==25){this.dataSource43=data}
    else if(i==26){this.dataSource44=data}
    else if(i==27){this.dataSource46=data}
    else if(i==28){this.dataSource47=data}
    else if(i==29){this.dataSource51=data}
    else if(i==30){this.dataSource52=data}
    else if(i==31){this.dataSource53=data}
    else if(i==32){this.dataSource57=data}
    else if(i==33){this.dataSource60=data}
  }
}
export interface checklist {

  id_cat: number;
  id_check:number;
  bool:boolean;
  
}
export interface PeriodicElement {

  categorie: string;
  id_categorie:number;
 

}
export interface PeriodicElement1 {

  categorie: string;
  id_categorie:number;
  action:boolean;
  cat:number;

}
export interface matcheck {

  categorie: string;
  
  id_categorie:number;
 
  
}
export interface matcheck2 {

  categorie: string;
  unite:string;
  id_categorie:number;
 
  
}
export interface table {
  id: number;
  idtab:number;
  idcat:number;
  idcheck:number;  
}
const ejoueur:any[]=[]; 
const elm_dt:Action[]=[]; 
const elm_tabs:any[]=[]; 
const All_tabs:any[]=[]; 
const edossier:Dossier[]=[];

const Tabs: PeriodicElement[] = [
  { id_categorie: 1, categorie: 'Géneral'},
  {id_categorie: 2, categorie: 'Cœur et poumon'},
];
const tableCate: table[] = [
  {idcat:1,idcheck:44,idtab:1,id:1},
  {idcat:1,idcheck:45,idtab:1,id:2},
  {idcat:1,idcheck:46,idtab:1,id:3},
  {idcat:2,idcheck:44,idtab:1,id:4},
  {idcat:2,idcheck:45,idtab:1,id:5},
  {idcat:2,idcheck:46,idtab:1,id:6},
  {idcat:3,idcheck:44,idtab:1,id:7},
  {idcat:3,idcheck:45,idtab:1,id:8},
  {idcat:3,idcheck:46,idtab:1,id:9},
  {idcat:4,idcheck:44,idtab:1,id:10},
  {idcat:4,idcheck:45,idtab:1,id:11},
  {idcat:4,idcheck:46,idtab:1,id:12},
  {idcat:5,idcheck:44,idtab:1,id:13},
  {idcat:5,idcheck:45,idtab:1,id:14},
  {idcat:5,idcheck:46,idtab:1,id:15},
  {idcat:6,idcheck:44,idtab:1,id:16},
  {idcat:6,idcheck:45,idtab:1,id:17},
  {idcat:6,idcheck:46,idtab:1,id:18},
  {idcat:7,idcheck:44,idtab:1,id:19},
  {idcat:7,idcheck:45,idtab:1,id:20},
  {idcat:7,idcheck:46,idtab:1,id:21},
  {idcat:8,idcheck:47,idtab:2,id:22},
  {idcat:8,idcheck:48,idtab:2,id:23},
  {idcat:8,idcheck:49,idtab:2,id:24},
  {idcat:9,idcheck:47,idtab:2,id:25},
  {idcat:9,idcheck:48,idtab:2,id:26},
  {idcat:9,idcheck:49,idtab:2,id:27},
  {idcat:10,idcheck:47,idtab:2,id:28},
  {idcat:10,idcheck:48,idtab:2,id:29},
  {idcat:10,idcheck:49,idtab:2,id:30},
  {idcat:11,idcheck:47,idtab:2,id:31},
  {idcat:11,idcheck:48,idtab:2,id:32},
  {idcat:11,idcheck:49,idtab:2,id:33},
  {idcat:12,idcheck:47,idtab:2,id:34},
  {idcat:12,idcheck:48,idtab:2,id:35},
  {idcat:12,idcheck:49,idtab:2,id:36},
  {idcat:13,idcheck:47,idtab:2,id:37},
  {idcat:13,idcheck:48,idtab:2,id:38},
  {idcat:13,idcheck:49,idtab:2,id:39},
  {idcat:14,idcheck:47,idtab:2,id:40},
  {idcat:14,idcheck:48,idtab:2,id:41},
  {idcat:14,idcheck:49,idtab:2,id:42},
  {idcat:15,idcheck:47,idtab:2,id:43},
  {idcat:15,idcheck:48,idtab:2,id:44},
  {idcat:15,idcheck:49,idtab:2,id:45},
  {idcat:16,idcheck:47,idtab:2,id:46},
  {idcat:16,idcheck:48,idtab:2,id:47},
  {idcat:16,idcheck:49,idtab:2,id:48},
  {idcat:17,idcheck:47,idtab:2,id:49},
  {idcat:17,idcheck:48,idtab:2,id:50},
  {idcat:17,idcheck:49,idtab:2,id:51},
  
];
const ELEMENT_DATA: PeriodicElement[] = [
  { id_categorie: 1, categorie: 'Symptômes de la grippe'},
  {id_categorie: 2, categorie: 'Infections (surtout virales)'},
  {id_categorie: 3, categorie: 'Fièvre rhumatismale'},
  {id_categorie: 4, categorie: 'Coups de chaleur'},
  {id_categorie: 5,  categorie: 'Commotion'},
  {id_categorie: 6, categorie: 'Allergie nourriture/insectes'},
  {id_categorie: 7,  categorie: 'Allergie médicaments'}
 
];
const ELEMENT_DATA1: PeriodicElement[] = [
  { id_categorie: 8, categorie: 'Douleur ou oppression thoracique'},
  {id_categorie: 9, categorie: 'Souffle court', },
  {id_categorie: 10, categorie: 'Asthme'},
  {id_categorie: 11, categorie: 'Toux'},
  {id_categorie: 12,  categorie: 'Bronchite'},
  {id_categorie: 13, categorie: 'Palpitations'},
  {id_categorie: 14,  categorie: 'Arythmie cardiaque'},
  {id_categorie: 15, categorie: 'Autres problèmes cardiaques'},
  {id_categorie: 16,  categorie: 'Vertiges'},
  {id_categorie: 17,  categorie: 'Syncopes'}
 
];
const ELEMENT_DATA2: PeriodicElement[] = [
  { id_categorie: 18, categorie: 'Hypertension'},
  {id_categorie: 19, categorie: 'Souffle au cœur', },
  {id_categorie: 20, categorie: 'Profil lipidique anormal'},
  {id_categorie: 21, categorie: 'Crises, épilepsie'},
  {id_categorie: 22,  categorie: 'Conseillé d’arrêter le sport'},
  {id_categorie: 23, categorie: 'Fatigué plus vite que coéquipiers'},
  {id_categorie: 24,  categorie: 'Diarrhées '}
 
];
const ELEMENT_DATA3: PeriodicElement[] = [
  { id_categorie: 25, categorie: 'Adducteurs'},
  {id_categorie: 26, categorie: 'Quadriceps', },
  {id_categorie: 27, categorie: 'Ischio-jambiers'},
  {id_categorie: 28, categorie: 'Ligaments du genou'},
  {id_categorie: 29,  categorie: 'Ligaments de la cheville'},
  {id_categorie: 30, categorie: 'autre'},
  /*{id_categorie: 7,  categorie: 'Pour « autre », merci de fournir le diagnostic '}*/
 
];
const ELEMENT_DATA4: PeriodicElement[] = [
  { id_categorie: 31, categorie: 'Hanche'},
  {id_categorie: 32, categorie: 'Aine (pubalgie)', },
  {id_categorie: 33, categorie: 'Ligaments du genou'},
  {id_categorie: 34, categorie: 'Ménisque ou cartilage du genou'},
  {id_categorie: 35,  categorie: 'Tendon Achille'},
  {id_categorie: 36, categorie: 'cheville'},
  {id_categorie: 37,  categorie: 'autre'}
  /*{id_categorie: 7,  categorie: 'Pour « autre », merci de fournir le diagnostic '}*/
 
];

const ELEMENT_DATA5: PeriodicElement[] = [
  { id_categorie: 38, categorie: 'Gènes ou douleurs récurrentes : '},
  
  /*{id_categorie: 7,  categorie: 'Pour « autre », merci de fournir le diagnostic '}*/
 
];
const ELEMENT_DATA15: PeriodicElement[] = [
  { id_categorie: 50, categorie: 'Blessures graves : '},
  
  /*{id_categorie: 7,  categorie: 'Pour « autre », merci de fournir le diagnostic '}*/
 
];
const ELEMENT_DATA16: PeriodicElement[] = [
  { id_categorie: 1151, categorie: 'Opérations sur l’appareil locomoteur : '},
  
  /*{id_categorie: 7,  categorie: 'Pour « autre », merci de fournir le diagnostic '}*/
 
];
const ELEMENT_DATA17: PeriodicElement[] = [
  { id_categorie: 5441, categorie: 'Diagnostic et traitement :'},
  
  /*{id_categorie: 7,  categorie: 'Pour « autre », merci de fournir le diagnostic '}*/
 
];
const ELEMENT_DATA177: PeriodicElement[] = [
  { id_categorie: 6441, categorie: 'Repos'},
  { id_categorie: 6442, categorie: 'Physiothérapie'},
  { id_categorie: 6443, categorie: 'Chirurgie'},
  /*{id_categorie: 7,  categorie: 'Pour « autre », merci de fournir le diagnostic '}*/
 
];
const ELEMENT_DATA6: matcheck[] = [
  { id_categorie: 349, categorie: 'pubalgie'},
  { id_categorie: 440, categorie: 'lésion de l’ischio-jambier'},
  { id_categorie: 441, categorie: 'lésion du quadriceps'},
  { id_categorie: 442, categorie: 'entorse du genou'},
  { id_categorie: 443, categorie: 'lésion du ménisque'},
  { id_categorie: 444, categorie: 'tendinite de la cheville'},
  { id_categorie: 445, categorie: 'entorse de la cheville '},
  { id_categorie: 446, categorie: 'commotion'},
  { id_categorie: 447, categorie: 'douleur lombaire'},
  { id_categorie: 448, categorie: 'Autre'},
  
  /*{id_categorie: 7,  categorie: 'Pour « autre », merci de fournir le diagnostic '}*/
 
];
const ELEMENT_DATA7: matcheck[] = [
  { id_categorie: 418, categorie: 'Mort subite'},
  { id_categorie: 429, categorie: 'Mort subite (infantile)'},
  { id_categorie: 530, categorie: 'Maladie coronarienne'},
  { id_categorie: 541, categorie: 'Cardiomyopathie'},
  { id_categorie: 552, categorie: 'Hypertension'},
  { id_categorie: 563, categorie: 'Syncope à répétition'},
  { id_categorie: 574, categorie: 'Arythmie cardiaque'},
  { id_categorie: 585, categorie: 'Transplantation cardiaque'},
  { id_categorie: 596, categorie: 'Chirurgie cardiaque'},
  { id_categorie: 517, categorie: 'Pacemaker/Défibrillateur'},
  { id_categorie: 528, categorie: 'Syndrome de Marfan'},
  { id_categorie: 539, categorie: 'Noyade inexpliquée'},
  { id_categorie: 640, categorie: 'Accident de voiture inexpliqué'},
  { id_categorie: 651, categorie: 'AVC'},
  { id_categorie: 662, categorie: 'Diabète'},
  { id_categorie: 673, categorie: 'Cancer'},
  { id_categorie: 684, categorie: 'autre'},
  
  /*{id_categorie: 7,  categorie: 'Pour « autre », merci de fournir le diagnostic '}*/
 
];
const ELEMENT_DATA8: matcheck[] = [
  { id_categorie: 625, categorie: 'Anti-inflammatoires non stéroïdiens'},
  { id_categorie: 626, categorie: 'Médicaments contre l’asthme'},
  { id_categorie: 627, categorie: 'Médicament contre l’hypertension'},
  { id_categorie: 628, categorie: 'Antidiabétique'},
  { id_categorie: 629, categorie: 'Hypolipidémiant'},
  { id_categorie: 720, categorie: 'Psychotrope'},
  { id_categorie: 721, categorie: 'autre'},
 
  
  /*{id_categorie: 7,  categorie: 'Pour « autre », merci de fournir le diagnostic '}*/
 
];

  const ELEMENT_DATA10 : matcheck[]=[
    { id_categorie: 1222, categorie:'tête/visage'}, { id_categorie: 2222, categorie:'nuque'},{ id_categorie: 3222, categorie:'vertèbre thoracique'},{ id_categorie: 4222, categorie:'vertèbre lombaire'},{ id_categorie: 5222, categorie:'abdomen'},{ id_categorie: 6222, categorie:'doigts'},{ id_categorie: 7222, categorie:'épaule'},{ id_categorie: 8222, categorie:'bras'},{ id_categorie: 9222, categorie:'coude'},{ id_categorie: 91222, categorie:'poignet'},{ id_categorie: 92122, categorie:'bassin/sacrum'},{ id_categorie: 10222, categorie:'hanche'},{ id_categorie: 11222, categorie:'aine'},{ id_categorie: 12222, categorie:'cuisse'},{ id_categorie: 13222, categorie:'bassin/sacrum'}
    ,{ id_categorie: 14222, categorie:'basse jambe'},{ id_categorie: 15222, categorie:'tend. d’Achille'},{ id_categorie: 16222, categorie:'cheville'},{ id_categorie: 17222, categorie:'pied/orteil'},{ id_categorie: 18222, categorie:'hanche (droit)'},{ id_categorie: 19222, categorie:'aine (droit)'},{ id_categorie: 20222, categorie:'cuisse (droit)'},{ id_categorie: 21222, categorie:'genou (droit)'},{ id_categorie: 22222, categorie:'basse jambe (droit)'},{ id_categorie: 23222, categorie:'tend. d’Achille (droit)'},{ id_categorie: 24222, categorie:'cheville (droit)'},{ id_categorie: 25222, categorie:'pied/orteil (droit)'},{ id_categorie: 26222, categorie:'hanche (gauche)'},{ id_categorie: 27222, categorie:'aine (gauche)'}
    ,{ id_categorie: 28222, categorie:'cuisse (gauche)'},{ id_categorie: 29222, categorie:'genou (gauche)'},{ id_categorie: 30222, categorie:'basse jambe (gauche)'},{ id_categorie: 31222, categorie:'tend. d’Achille (gauche)'},{ id_categorie: 32222, categorie:'cheville (gauche)'},{ id_categorie: 33222, categorie:'pied/orteil (gauche)'}
];
const ELEMENT_DATA9 : matcheck[]=[
  { id_categorie: 34, categorie: 'Non'},
  { id_categorie: 35, categorie: 'Oui'}

];

const ELEMENT_DATA11 : matcheck[]=[
  { id_categorie: 36, categorie: 'repos'},
  { id_categorie: 37, categorie: 'physiothérapie'},
  { id_categorie: 38, categorie: 'chirurgie'}
]
const ELEMENT_DATA12 : matcheck[]=[
  { id_categorie: 39, categorie: 'Non'},
  { id_categorie: 40, categorie: 'Père'},
  { id_categorie: 41, categorie: 'Mère'},
  { id_categorie: 42, categorie: 'Frére/soeur'},
  { id_categorie: 43, categorie: 'Autre'}
]
const ELEMENT_DATA13 : matcheck[]=[
  { id_categorie: 44, categorie: 'Non'},
  { id_categorie: 45, categorie: 'oui, dans les 4 dernières semaines'},
  { id_categorie: 46, categorie: 'oui, il y a plus de 4 semaines'}]
  const ELEMENT_DATA14 : matcheck[]=[
    { id_categorie: 47, categorie: 'Non'},
    { id_categorie: 48, categorie: 'Dans les 4 dernières semaines au repos… pendant'},
    { id_categorie: 49, categorie: 'Dans les 4 dernières semaines après l’effort'}
]
const ELEMENT_DATA18 : matcheck[]=[
  { id_categorie: 59, categorie: 'Taille'},
  { id_categorie: 58, categorie: 'Poids'},
  { id_categorie: 53, categorie: 'Glande thyroïde'},
  { id_categorie: 54, categorie: 'Nœud lymphatique/rate'},
  { id_categorie: 55, categorie: 'Poumons Percussion'},
  { id_categorie: 56, categorie: 'Respiration'},
  { id_categorie: 57, categorie: 'Abdomen Palpation'},
]
const ELEMENT_DATA19 : matcheck[]=[
  { id_categorie: 59, categorie: 'Symptômes du syndrome de Marfan'},

]
const ELEMENT_DATA20 : matcheck[]=[
  { id_categorie: 60, categorie: 'déformation du thorax'},
  { id_categorie: 61, categorie: 'long bras et longues jambes'},
  { id_categorie: 62, categorie: 'pieds plats'},
  { id_categorie: 63, categorie: 'scoliose'},
  { id_categorie: 64, categorie: 'dislocation du cristallin'},
  { id_categorie: 65, categorie: 'autre'},
  
]
const ELEMENT_DATA21 : matcheck[]=[
  { id_categorie: 66, categorie: 'Rythme'},
  { id_categorie: 67, categorie: 'Son'},
  { id_categorie: 68, categorie: 'Souffle'},
  { id_categorie: 69, categorie: 'Œdème périphérique'},
  { id_categorie: 70, categorie: 'Veine jugulaire (position à 45°)'},
  { id_categorie: 71, categorie: 'Reflux hépato-jugulaire'},
  
]
const ELEMENT_DATA22 : matcheck[]=[
  { id_categorie: 72, categorie: 'normal'},
  { id_categorie: 73, categorie: 'arythmique'}
]
const ELEMENT_DATA23 : matcheck[]=[
  { id_categorie: 74, categorie: 'normal'},
  { id_categorie: 75, categorie: 'anormal'}
]
const ELEMENT_DATA24 : matcheck[]=[
  { id_categorie: 76, categorie: 'palpable'},
  { id_categorie: 77, categorie: 'non palpable'}
]
const ELEMENT_DATA25 : matcheck[]=[
  { id_categorie: 78, categorie: 'Pouls périphérique'},
  { id_categorie: 79, categorie: 'Bruits vasculaires'},
  { id_categorie: 80, categorie: 'Varices'}
]
const ELEMENT_DATA26: matcheck[]=[
  { id_categorie: 81, categorie: 'Pouls après 5 minutes de repos'},

]
const ELEMENT_DATA27: matcheck[]=[
  { id_categorie: 82, categorie: 'Bras droit'},
  { id_categorie: 83, categorie: 'Bras gauche'},
  { id_categorie: 84, categorie: 'Cheville'}
]
const ELEMENT_DATA28: matcheck[]=[
  { id_categorie: 83, categorie: 'battements ventriculaires prématurés'},
  { id_categorie: 84, categorie: 'battements supraventriculaires prématurés'},
  { id_categorie: 85, categorie: 'tachycardie supraventriculaire'},
  { id_categorie: 86, categorie: 'arythmie ventriculaire'},
  { id_categorie: 87, categorie: 'flutter auriculaire/fibrillation'},
  { id_categorie: 88, categorie: 'grande amplitude (onde delta)'},
  { id_categorie: 89, categorie: 'bloc atrio-ventriculaire'}
]
const ELEMENT_DATA29: matcheck[]=[
  { id_categorie: 90, categorie: 'Rythme/conduction'},
 
]
const ELEMENT_DATA30: matcheck[]=[
  { id_categorie: 91, categorie: 'Indices temporels'},
 
]
const ELEMENT_DATA34: matcheck[]=[
  { id_categorie: 91, categorie: 'Dilatation auriculaire	'},
 
]
const ELEMENT_DATA31: matcheck[]=[
  { id_categorie: 93, categorie: 'PQ_________ms'},
  { id_categorie: 94, categorie: 'QRS________ms'},
  { id_categorie: 95, categorie: 'QTc________ms'},
 
]
const ELEMENT_DATA32: matcheck[]=[
  { id_categorie: 96, categorie: 'gauche (partie négative de l’onde P dans V1≥0,1mV en amplitude et ≥0,04 s en durée)'},
  { id_categorie: 98, categorie: 'droite (pic d’onde P dans électrodes II et III ou V1≥0,25mV en amplitude)'},
]
const ELEMENT_DATA33: matcheck[]=[
  { id_categorie: 99, categorie: 'Axe'},
  { id_categorie: 100, categorie: 'Voltage'},
  { id_categorie: 101, categorie: 'Hypertrophie du ventricule gauche'},
  { id_categorie: 991, categorie: 'Ondes Q'},
  { id_categorie: 1001, categorie: 'Bloc de branche'},
  { id_categorie: 1011, categorie: 'Onde R'},
 
 
]
const ELEMENT_DATA35: matcheck[]=[
  { id_categorie: 102, categorie: 'Baisse des ondes ST'},
  { id_categorie: 103, categorie: 'Aplatissement des ondes T'},
  { id_categorie: 104, categorie: 'Inversion des ondes T'},
  { id_categorie: 105, categorie: 'Repolarisation  prématurée'},
]
const ELEMENT_DATA36: matcheck[]=[
  { id_categorie: 106, categorie: 'I'},
  { id_categorie: 107, categorie: 'II'},
  { id_categorie: 108, categorie: 'III'},
  { id_categorie: 109, categorie: 'aVR'},
  { id_categorie: 110, categorie: 'aVL'},
  { id_categorie: 111, categorie: 'AVF'},
  { id_categorie: 112, categorie: 'v1'},
  { id_categorie: 113, categorie: 'v2'},
  { id_categorie: 114, categorie: 'v3'},
  { id_categorie: 115, categorie: 'v4'},
  { id_categorie: 116, categorie: 'v5'},
  { id_categorie: 117, categorie: 'v6'},

]

const ELEMENT_DATA37: matcheck[]=[
  { id_categorie: 130, categorie: 'Surface corporelle (BSA) : m2'},


]
const ELEMENT_DATA38: matcheck2[]=[
  { id_categorie: 118,unite:'______ cm/m²', categorie: 'Diamètre télédiastolique <br/>  (valeurs normales : ♀<3,2 cm/m², ♂<3,1cm/m²)'},
  { id_categorie: 119,unite:'______ cm/m²', categorie: 'Diamètre télésystolique cm/m2'},
  { id_categorie: 120,unite:'______ cm/m²', categorie: 'Épaisseur du septum interventriculaire télédiastolique <br/> (valeurs normales : ♀<0,9 cm/m², ♂<1,0cm/m²)'},
  { id_categorie: 121,unite:'______ cm/m²', categorie: 'Épaisseur diastolique de la paroi postérieure  (valeurs normales : ♀<0,9 cm/m², ♂<1,0cm/m²)'},
  { id_categorie: 122,unite:'______ ml/m²', categorie: 'Volume diastolique du ventricule gauche (valeurs normales ♀ et ♂ <75 ml/m²)'},
  { id_categorie: 123,unite:'______ ml/m²', categorie: 'Volume systolique du ventricule gauche (valeurs normales : ♀ et ♂<30 ml/m²)'},
  { id_categorie: 124,unite:'______ g/m²', categorie: 'MMI du ventricule gauche (masse/BSA ; méthode linéaire) (valeurs normales : ♀<95 g/m²), ♂<115 g/m²)'},
  { id_categorie: 125,unite:'______ mm', categorie: 'Fonction systolique Mouvement antérieur de la valve mitrale  mm'},
  { id_categorie: 126,unite:'______ %', categorie: 'Fraction de raccourcissement (endocardique) (valeurs normales : ♀>27 %, ♂> 25 %)'},
  { id_categorie: 127,unite:'______ %', categorie: 'Fraction d’éjection (méthode de Simpson ou de la longueur de l’aire) (valeur normale : ≥ 55%)'},
  { id_categorie: 128,unite:'______ cm/m²', categorie: 'Mouvement régional de la paroi'},
  { id_categorie: 129,unite:'______ cm/s', categorie: 'Fonction diastolique'},

]
const ELEMENT_DATA39: matcheck2[]=[
  { id_categorie: 131,unite:'______ cm/s', categorie: 'Onde E'},
  { id_categorie: 132,unite:'______ cm/s', categorie: 'Onde A'},
  { id_categorie: 133,unite:'______', categorie: '(rapport E/A)'},
  { id_categorie: 134,unite:'______ ms', categorie: 'Durée de décélération'},
  { id_categorie: 135,unite:'______ cm/s', categorie: 'E’ (Doppler tissulaire)	septal'},
  { id_categorie: 136,unite:'______ cm/s', categorie: 'paroi latérale'},
  { id_categorie: 137,unite:'______ ', categorie: 'E/E’'},
 

]
const ELEMENT_DATA40: matcheck2[]=[
  { id_categorie: 131,unite:'______cm', categorie: 'Diamètre (mode M, grand axe parasternal)'},
  { id_categorie: 132,unite:'______ cm', categorie: 'Aire (vue des quatre chambres) (valeurs normales : <20 cm²)'},
  { id_categorie: 133,unite:'______ ml/m2', categorie: 'Volume (méthode de Simpson ou de la longueur de l’aire) (valeurs normales : ♀ et ♂ <28ml/m²)'},

]
const ELEMENT_DATA41: matcheck2[]=[
  { id_categorie: 131,unite:'______ cm', categorie: 'Aire (vue des quatre chambres) (valeurs normales : <20 cm²)'},
  { id_categorie: 132,unite:'______ cm', categorie: 'Diamètre de la veine cave inférieure'},
  { id_categorie: 12333,unite:'______ cm/m²', categorie: 'Variabilité respiratoire du diamètre de la veine cave inférieure'},

 

]
const ELEMENT_DATA42: matcheck[]=[
  { id_categorie: 1531, categorie: '>50 %'},
  { id_categorie: 1352, categorie: '<50 %'},

 

]

const ELEMENT_DATA43: matcheck2[]=[
  { id_categorie: 131,unite:'______ cm (valeurs normales : <3,3 cm)', categorie: 'Diamètre (vue des quatre chambres)'},
  { id_categorie: 132,unite:'______ cm (valeurs normales : <7,9 cm)', categorie: 'Longueur (vue des quatre chambres)'},
  { id_categorie: 133,unite:'______ % (valeurs normales : > 32%)', categorie: 'Variation de surface'},
  { id_categorie: 131,unite:'______ mm', categorie: 'Mouvement tricuspide antérieur'},
  { id_categorie: 132,unite:'______ mmHg', categorie: 'Rapport systolique ventricule droit/oreillette droite'},
  { id_categorie: 133,unite:'______ mmHg', categorie: 'Mouvement régional de la paroi'},
  { id_categorie: 131,unite:'______ mmHg', categorie: 'Anévrisme local'},
  { id_categorie: 132,unite:'______ mmHg', categorie: 'Hypertrophie'},
  { id_categorie: 133,unite:'______ cm (valeurs normales : <0,5 cm)', categorie: 'Épaisseur de la paroi libre'},
 

]
const ELEMENT_DATA44: matcheck[]=[
  { id_categorie: 134, categorie: 'Valvule aortique'},
  { id_categorie: 135, categorie: 'Visualisation de l’ostium coronarien'},
  { id_categorie: 136, categorie: 'Valvule mitrale'},
  { id_categorie: 137, categorie: 'Valvule tricuspide'},
  { id_categorie: 138, categorie: 'Valvule pulmonaire'},
  { id_categorie: 139, categorie: 'Diamètre de la base de l’aorte'},
  { id_categorie: 140, categorie: 'Aorte ascendante'},
  { id_categorie: 141, categorie: 'Résumé analyse de l’échocardiographie'},
]
const ELEMENT_DATA45: matcheck[]=[
  { id_categorie: 142, categorie: 'Impossible'},
  { id_categorie: 143, categorie: 'Possible'},
 
]
const ELEMENT_DATA46: matcheck2[]=[
  { id_categorie: 144,unite:'______ mg/dl', categorie: 'Hémoglobine (mg/dl)'},
  { id_categorie: 145,unite:'______ %', categorie: 'Hématocrite (%)'},
  { id_categorie: 146,unite:'______ mg/dl', categorie: 'Érythrocytes (mg/dl)'},
  { id_categorie: 147,unite:'______ mg/dl', categorie: 'Thrombocytes (mg/dl)'},
  { id_categorie: 148,unite:'______ mg/dl', categorie: 'Leucocytes (mg/dl)'},
  { id_categorie: 149,unite:'_____ mmol/l', categorie: 'Sodium (mmol/l)'},
  { id_categorie: 150,unite:'_____ mmol/l', categorie: 'Potassium (mmol/l)'},
  { id_categorie: 151,unite:'_____ µmol/l', categorie: 'Créatinine (µmol/l)'},
  { id_categorie: 152,unite:'_____ mmol/l', categorie: 'Cholestérol (total) (mmol/l)'},
  { id_categorie: 153,unite:'_____ mmol/l', categorie: 'Cholestérol LDL (mmol/l)'},
  { id_categorie: 154,unite:'_____ mmol/l', categorie: 'Cholestérol HDL (mmol/l)'},
  { id_categorie: 155,unite:'_____ mmol/l', categorie: 'Triglycérides (mmol/l)'},
  { id_categorie: 156,unite:'_____ mmol/l', categorie: 'Glucose (mmol/l)'},
  { id_categorie: 157,unite:'_____ mg/l', categorie: 'Protéine C-réactive (mg/l)'},
]
const ELEMENT_DATA47: matcheck[]=[
  { id_categorie: 158, categorie: 'Forme de la colonne'},
  { id_categorie: 159, categorie: 'Niveau du bassin'},
  { id_categorie: 160, categorie: 'Différence de niveau malléolaire'},
  { id_categorie: 161, categorie: 'Rotation cervicale à droite'},
  { id_categorie: 1621, categorie: 'Rotation cervicale à gauche'},
  { id_categorie: 1631, categorie: 'Souplesse rachidienne'},
]
const ELEMENT_DATA48: matcheck[]=[
  { id_categorie: 162, categorie: 'normal'},
  { id_categorie: 163, categorie: 'plat'},
  { id_categorie: 164, categorie: 'hypercyphose'},
  { id_categorie: 165, categorie: 'hyperlordose'},
  { id_categorie: 166, categorie: 'scoliose'},
]
const ELEMENT_DATA49: matcheck[]=[
  { id_categorie: 167, categorie: 'horizontal'},
  { id_categorie: 168, categorie: 'plus bas à droite'},
  { id_categorie: 169, categorie: 'plus bas à gauche'},
]
const ELEMENT_DATA50: matcheck[]=[
  { id_categorie: 170, categorie: 'à droite'},
  { id_categorie: 171, categorie: 'à gauche'},
 
]
const ELEMENT_DATA51: matcheck[]=[
  { id_categorie: 17212, categorie: 'Flexion / Extension à droite'},
  { id_categorie: 1721, categorie: 'Flexion / Extension à gauche'},
  { id_categorie: 173, categorie: 'Rotation vers l’intérieur (flexion de 90°) à droite'},
  { id_categorie: 1731, categorie: 'Rotation vers l’intérieur (flexion de 90°) à gauche'},
  { id_categorie: 174, categorie: 'Abduction à droite'},
  { id_categorie: 1741, categorie: 'Abduction à gauche'},
  { id_categorie: 175, categorie: 'Sensibilité à la palpation de l’aine à droite'},
  { id_categorie: 1751, categorie: 'Sensibilité à la palpation de l’aine à gauche'},
  { id_categorie: 176, categorie: 'Hernie à droite'},
  { id_categorie: 1761, categorie: 'Hernie à gauche'},
]
const ELEMENT_DATA52: matcheck[]=[
  { id_categorie: 177, categorie: 'Adducteurs à droite'},
  { id_categorie: 1771, categorie: 'Adducteurs  à gauche'},
  { id_categorie: 178, categorie: 'Ischio-jambiers à droite'},
  { id_categorie: 1781, categorie: 'Ischio-jambiers  à gauche'},
  { id_categorie: 179, categorie: 'Iliopsoas à droite'},
  { id_categorie: 1791, categorie: 'Iliopsoas  à gauche'},
  { id_categorie: 180, categorie: 'Quadriceps à droite'},
  { id_categorie: 1801, categorie: 'Quadriceps  à gauche'},
]
const ELEMENT_DATA53: matcheck[]=[
  { id_categorie: 1811, categorie: 'Axe de l’articulation du genou à droite'},
  { id_categorie: 18111, categorie: 'Axe de l’articulation du genou à gauche'},
  { id_categorie: 1821, categorie: 'Flexion / Extension à droite'},
  { id_categorie: 182231, categorie: 'Flexion / Extension à gauche'},
  { id_categorie: 18333, categorie: 'Test de Lachman à droite'},
  { id_categorie: 18351, categorie: 'Test de Lachman à gauche'},
  { id_categorie: 1845, categorie: 'Signe de tiroir antérieur (genou à 90° de flexion) à droite'},
  { id_categorie: 18451, categorie: 'Signe de tiroir antérieur (genou à 90° de flexion) à gauche'},
  { id_categorie: 1855, categorie: 'Valgus forcé, en extension à droite'},
  { id_categorie: 18551, categorie: 'Valgus forcé, en extension à gauche'},
  { id_categorie: 1865, categorie: 'Valgus forcé, 30° de flexionà droite '},
  { id_categorie: 18651, categorie: 'Valgus forcé, 30° de flexion à gauche'},
  { id_categorie: 1875, categorie: 'Varus forcé, en extension à droite'},
  { id_categorie: 18751, categorie: 'Varus forcé, en extension à gauche'},
  { id_categorie: 1885, categorie: 'Varus forcé, 30° de flexion à droite'},
  { id_categorie: 18815, categorie: 'Varus forcé, 30° de flexion à gauche'},
]
const ELEMENT_DATA54: matcheck[]=[
  { id_categorie: 189, categorie: 'non'},
  { id_categorie: 190, categorie: 'pubis'},
  { id_categorie: 191, categorie: 'canal inguinal'},
]
const ELEMENT_DATA55: matcheck[]=[
  { id_categorie: 192, categorie: 'normal'},
  { id_categorie: 193, categorie: 'genu varum'},
  { id_categorie: 194, categorie: 'genu valgum'},
]
const ELEMENT_DATA56: matcheck[]=[
  { id_categorie: 1921, categorie: 'normal'},
  { id_categorie: 1931, categorie: '+'},
  { id_categorie: 1941, categorie: '++'},
  { id_categorie: 1951, categorie: '+++'},
]
const ELEMENT_DATA57: matcheck[]=[
  { id_categorie: 181, categorie: 'Sensibilité de la cheville à droite'},
  { id_categorie: 181211, categorie: 'Sensibilité de la cheville à gauche'},
  { id_categorie: 182, categorie: 'Signe de tiroir antérieur à droite'},
  { id_categorie: 1821, categorie: 'Signe de tiroir antérieur à gauche'},
  { id_categorie: 183, categorie: 'Dorsiflexion à droite'},
  { id_categorie: 1831, categorie: 'Dorsiflexion à gauche'},
  { id_categorie: 184, categorie: 'Flexion plantaire à droite'},
  { id_categorie: 1841, categorie: 'Flexion plantaire à gauche'},
  { id_categorie: 185, categorie: 'Supination totale à droite'},
  { id_categorie: 1851, categorie: 'Supination totale à gauche'},
  { id_categorie: 186, categorie: 'Pronation totale à droite'},
  { id_categorie: 1861, categorie: 'Pronation totale à gauche'},
  { id_categorie: 187, categorie: 'Articulation métatarsienne à droite'},
  { id_categorie: 1871, categorie: 'Articulation métatarsienne à gauche'},
 

]
const ELEMENT_DATA58: matcheck[]=[
  { id_categorie: 188, categorie: 'normal'},
  { id_categorie: 189, categorie: 'diminuée'},
  { id_categorie: 190, categorie: 'accrue'},
]
const ELEMENT_DATA59: matcheck[]=[
  { id_categorie: 191, categorie: 'normal'},
  { id_categorie: 192, categorie: 'pathologique'},

]
const ELEMENT_DATA60: matcheck[]=[
  { id_categorie: 193, categorie: 'Suspicion de pathologie cardiaque'},
  { id_categorie: 194, categorie: 'Autres pathologies'},
  { id_categorie: 195, categorie: 'APTE A LA PRATIQUE DU FOOTBALL DE HAUT NIVEAU'},

]
const ELEMENT_DATA61: matcheck[]=[
  { id_categorie: 196, categorie: 'dédoublement'},
  { id_categorie: 197, categorie: 'paradoxal'},
  { id_categorie: 198, categorie: '3e son'},
  { id_categorie: 199, categorie: '4e son'},
]
const ELEMENT_DATA62: matcheck[]=[
  { id_categorie: 200, categorie: 'dédoublement'},
  { id_categorie: 201, categorie: 'diastolique'},
  { id_categorie: 202, categorie: 'claquements'},
  { id_categorie: 203, categorie: 'changements durant la manœuvre de Valsalva'},
  { id_categorie: 204, categorie: 'changements après s’être levé brusquement'},
]
const ELEMENT_DATA63: matcheck[]=[
  { id_categorie: 205, categorie: 'premier degré'},
  { id_categorie: 206, categorie: 'second degré type I'},
  { id_categorie: 207, categorie: 'second degré type II'},
  { id_categorie: 208, categorie: 'troisième degré'},
 
]
const ELEMENT_DATA64: matcheck[]=[
  { id_categorie: 209, categorie: 'gauche complet (>0,12 s)'},
  { id_categorie: 210, categorie: 'droit complet (>0,12 s)'},
  { id_categorie: 211, categorie: 'antérieur gauche incomplet'},
  { id_categorie: 212, categorie: 'postérieur gauche incomplet'},
  { id_categorie: 213, categorie: 'incomplet droit'},
]
const ELEMENT_DATA65: matcheck[]=[
  { id_categorie: 214, categorie: 'raccourci'},
  { id_categorie: 215, categorie: 'douloureux'},

]
const ELEMENT_DATA66: matcheck[]=[
  { id_categorie: 216, categorie: 'gauche'},
  { id_categorie: 217, categorie: 'droite'},
  { id_categorie: 218, categorie: 'vue de petit axe parasternal'},
  { id_categorie: 219, categorie: 'autre vue'},

]