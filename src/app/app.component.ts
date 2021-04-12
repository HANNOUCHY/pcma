import { Component } from '@angular/core';
import { Router, NavigationEnd} from '@angular/router'; 
import { Location } from "@angular/common";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular7';
  constructor(private router: Router,private location: Location){
    //subscribes every changes of your route
    this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd){
           //scroll to top
           console.log(location.path());

         
           
          
        }
     })
 }
}
