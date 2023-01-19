import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private cookieService: CookieService, public router: Router) {}

  logout(){
    this.cookieService.delete('token');            
    this.router.navigateByUrl(''); 
  }
}
