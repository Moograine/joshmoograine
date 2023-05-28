import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../assets/services/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { error } from '@angular/compiler-cli/src/transformers/util';
import { AuthService } from '../../../assets/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  showError = false;
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
    if(!(this.formGroup.value.email && this.formGroup.value.password)) {
      return;
    }
    this.authService.login(this.formGroup.value.email, this.formGroup.value.password);
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

  showPassword(input: HTMLInputElement): void {
    input.type === 'password' ? input.type = 'text' : input.type = 'password';
  }
}
