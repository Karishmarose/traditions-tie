import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// SERVICES
import { AuthService } from '@core/services/auth';
import { GlobalDataService } from '@core/services/common';
// MODELS
import { PROFILE } from '@models/auth';
import { BehaviorSubject, Observable } from 'rxjs';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentUser$: Observable<PROFILE | undefined> = this.globalDataService.currentUser$
  constructor(private authService: AuthService, private globalDataService: GlobalDataService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getUserProfile();
  }

  onHandleRouter(routeName:String): void {
    this.router.navigate([routeName]);
  }

  logOut() {
    this.authService.logOut();
  }
}
