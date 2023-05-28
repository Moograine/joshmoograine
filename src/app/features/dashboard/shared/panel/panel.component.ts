import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../assets/services/user.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  openSettingsModal = false;
  openMyActivityModal = false;

  constructor(protected userService: UserService, private router: Router, private afAuth: AngularFireAuth) {
  }

  ngOnInit() {
    console.log(this.userService.currentUser.nickname);
    this.initUserInfo();
  }

  initUserInfo(): void {

  }

  logout(): void {
    this.afAuth.signOut().then((): void => {
      this.router.navigate(['/login']).then();
    });
  }

  openSettings(): void {
    this.openSettingsModal = true;
  }

  openMyActivity(): void {
    this.openMyActivityModal = true;
  }
}
