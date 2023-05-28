import { Injectable } from '@angular/core';
import { User, UserModel } from '../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Environment } from 'src/assets/environments/environment'
import { getAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  keyCollection: string[] = [];
  userCollection: UserModel[] = [];
  currentUser = new User();

  constructor(private http: HttpClient) {
  }

  initializeUsers(users: UserModel[]): void {
    for (let key in users) {
      this.keyCollection.push(key);
      this.userCollection.push(users[key]);
    }
    console.log('all users: ', this.userCollection)
    this.initializeCurrentUser();
  }

  initializeCurrentUser(): void {
    const auth = getAuth();
    auth.onAuthStateChanged((user: any) => {
      if (user) {
        for (let i in this.keyCollection) {
          if (auth.currentUser?.uid && this.keyCollection[i].includes(auth.currentUser.uid)) {
            this.currentUser = this.userCollection[i];
            break;
          }
        }
      } else {
        console.log('no user');
      }
    });
  }

  getUserNameById(id: number, fullName: boolean): string {
    return this.userCollection[id]?.[fullName ? 'name' : 'nickname'];
  }

  get getAllUsers(): Observable<UserModel[]> {
    return <Observable<UserModel[]>>this.http.get(`${Environment.defaultApi}/users.json`);
  }
}
