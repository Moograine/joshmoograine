import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  errorMessage = '';

  constructor(private router: Router, private afAuth: AngularFireAuth, private userService: UserService) {
  }

  login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.userService.initializeCurrentUser();
        this.router.navigate(['']).then();
        this.errorMessage = '';
      })
      .catch((error: any): void => {
        switch (error.code) {
          case 'auth/user-not-found':
            this.errorMessage = 'Email doesn\'t exist';
            break;
          case 'auth/wrong-password':
            this.errorMessage = 'Incorrect password';
            break;
          default:
            this.errorMessage = 'Something went wrong on our part. Please try again later.';
        }
        /* Clearing the console */
        setTimeout(() => console.clear(), 50);
        setTimeout(() => console.clear(), 250);
        setTimeout(() => console.clear(), 500);
      });
  }
}
