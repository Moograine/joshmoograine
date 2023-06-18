import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../assets/services/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../../assets/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorMessage = '';
  formGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private afAuth: AngularFireAuth, private authService: AuthService) {
  }

  matchUser(): void {
    if (!(this.formGroup.value.email && this.formGroup.value.password)) {
      return;
    }
    this.authService.login(this.formGroup.value.email, this.formGroup.value.password).then((): void => {
      this.errorMessage = this.authService.errorMessage;
      console.log('errorMessage from Login: ', this.errorMessage);
    });
    // for (let i of this.userService.userCollection) {
    //   if (i.email === this.formGroup.value.email && i.password === this.formGroup.value.password) {
    //     this.userService.currentUser = i;
    //     this.showError = false;
    //     this.login(i.id);
    //     return;
    //   }
    // }
    // this.showError = true;
  }
}
