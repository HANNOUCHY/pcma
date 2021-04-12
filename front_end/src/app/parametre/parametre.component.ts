import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.css'],
})
export class ParametreComponent {
profil:string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,private router : Router) {}
  Logout() {
    
    localStorage.removeItem('userToken');
    localStorage.removeItem('id');
    localStorage.removeItem('profil');
    window.location.href = '/login';



  }
  ngOnInit() {
  this.profil=localStorage.getItem('profil');

  }
  Navigate(parm) {
    
window.location.href = parm;

  }
  Pnavigate(parm) {
  
  
    if(parm=='club'){
      if(this.profil=='6'){
      return false;
      }else if(this.profil=='9'){
      return false;
      }else if(this.profil=='11'){
      return true;
      }else if(this.profil=='14'){
      return false;
      }else if(this.profil=='15'){
      return false;
      }
    }else if(parm=='joueur'){
      if(this.profil=='6'){
        return false;
        }else if(this.profil=='9'){
        return false;
        }else if(this.profil=='11'){
        return true;
        }else if(this.profil=='14'){
        return true;
        }else if(this.profil=='15'){
        return false;
        }
    }else if(parm=='saison'){
      if(this.profil=='6'){
        return false;
        }else if(this.profil=='9'){
        return false;
        }else if(this.profil=='11'){
        return true;
        }else if(this.profil=='14'){
        return false;
        }else if(this.profil=='15'){
        return false;
        }
    }else if(parm=='competition'){
      if(this.profil=='6'){
        return false;
        }else if(this.profil=='9'){
        return false;
        }else if(this.profil=='11'){
        return true;
        }else if(this.profil=='14'){
        return false;
        }else if(this.profil=='15'){
        return false;
        }
    }else if(parm=='rpcma'){
      if(this.profil=='6'){
        return false;
        }else if(this.profil=='9'){
        return true;
        }else if(this.profil=='11'){
        return true;
        }else if(this.profil=='14'){
        return false;
        }else if(this.profil=='15'){
        return false;
        }
    }else if(parm=='rjoueurs'){
      if(this.profil=='6'){
        return false;
        }else if(this.profil=='9'){
        return true;
        }else if(this.profil=='11'){
        return true;
        }else if(this.profil=='14'){
        return false;
        }else if(this.profil=='15'){
        return false;
        }
    }else if(parm=='rMedecin'){
      if(this.profil=='6'){
        return false;
        }else if(this.profil=='9'){
        return true;
        }else if(this.profil=='11'){
        return true;
        }else if(this.profil=='14'){
        return false;
        }else if(this.profil=='15'){
        return false;
        }
    }else if(parm=='utilisateur'){
      if(this.profil=='6'){
        return false;
        }else if(this.profil=='9'){
        return false;
        }else if(this.profil=='11'){
        return true;
        }else if(this.profil=='14'){
        return false;
        }else if(this.profil=='15'){
        return false;
        }
    }else if(parm=='profil'){
      if(this.profil=='6'){
        return false;
        }else if(this.profil=='9'){
        return false;
        }else if(this.profil=='11'){
        return true;
        }else if(this.profil=='14'){
        return false;
        }else if(this.profil=='15'){
        return false;
        }
    }else if(parm=='droit'){
      if(this.profil=='6'){
        return false;
        }else if(this.profil=='9'){
        return false;
        }else if(this.profil=='11'){
        return true;
        }else if(this.profil=='14'){
        return false;
        }else if(this.profil=='15'){
        return false;
        }
    }else if(parm=='parametre'){
      if(this.profil=='6'){
        return false;
        }else if(this.profil=='9'){
        return false;
        }else if(this.profil=='11'){
        return true;
        }else if(this.profil=='14'){
        return false;
        }else if(this.profil=='15'){
        return false;
        }
    }else if(parm=='rapport'){
      if(this.profil=='6'){
        return false;
        }else if(this.profil=='9'){
        return true;
        }else if(this.profil=='11'){
        return true;
        }else if(this.profil=='14'){
        return false;
        }else if(this.profil=='15'){
        return false;
        }
    }else if(parm=='donnee'){
      if(this.profil=='6'){
        return false;
        }else if(this.profil=='9'){
        return false;
        }else if(this.profil=='11'){
        return true;
        }else if(this.profil=='14'){
        return true;
        }else if(this.profil=='15'){
        return false;
        }
    }else if(parm=='dossier'){
      if(this.profil=='6'){
        return true;
        }else if(this.profil=='9'){
        return true;
        }else if(this.profil=='11'){
        return true;
        }else if(this.profil=='14'){
        return false;
        }else if(this.profil=='15'){
        return true;
      }  }else if(parm=='listd'){
          if(this.profil=='6'){
            return true;
            }else if(this.profil=='9'){
            return true;
            }else if(this.profil=='11'){
            return true;
            }else if(this.profil=='14'){
            return false;
            }else if(this.profil=='15'){
            return true;
         }   }else if(parm=='envoyer'){
              if(this.profil=='6'){
                return true;
                }else if(this.profil=='9'){
                return false;
                }else if(this.profil=='11'){
                return true;
                }else if(this.profil=='14'){
                return false;
                }else if(this.profil=='15'){
                return false;
                }
    
    }
    
   
    }
  }
