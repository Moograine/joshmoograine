import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
import FirebaseError = firebase.FirebaseError;
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router, private afAuth: AngularFireAuth, private userService: UserService) {
  }

  login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.userService.initializeCurrentUser();
        this.router.navigate(['']).then();
      })
      .catch((): void => {
        setTimeout(() => console.clear(), 50);
        setTimeout(() => console.clear(), 250);
        setTimeout(() => console.clear(), 500);
      });
  }
}
