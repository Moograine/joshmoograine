import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { hamburgerAnimation } from '../../../../../assets/animations/animations';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    hamburgerAnimation
  ]
})
export class HeaderComponent implements OnInit {
  activePhoneMenu = false;
  options = [
    'Repertoire',
    'Rehearsal',
    'Concert',
    'Datepicker'
  ]
  selectedOption = 'Rehearsal';

  constructor(private router: Router, private afAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.initOptions();
  }

  initOptions(): void {
    const route = this.router.url;
    this.selectedOption = route ? route[1].toUpperCase() + route.slice(2) : this.options[1];
  }

  togglePhoneMenu(): void {
    this.activePhoneMenu = !this.activePhoneMenu;
  }

  logout(): void {
    this.afAuth.signOut().then((): void => {
      this.router.navigate(['/login']).then();
    });
  }

  navigate(): void {
    this.router.navigate([this.selectedOption.toLowerCase()]);
  }
}
