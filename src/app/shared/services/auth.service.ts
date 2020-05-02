import { Injectable } from '@angular/core';
import { UserI } from '../models/user.interface';
import { FileI } from '../models/file.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userData$: Observable<firebase.User>;
  public uid: string;
  private filePath: string;


  constructor(private afAuth: AngularFireAuth, private storage: AngularFireStorage) {
    this.userData$ = afAuth.authState;
  }

  loginByEmail(user: UserI) {
    const { email, password } = user;
    this.uid = user.uid;
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.afAuth.signOut();
  }

  preSaveUserProfile(user: UserI): void {
    this.saveUserProfile(user);
  }

 async saveUserProfile(user: UserI) {
    (await this.afAuth.currentUser).updateProfile({
      displayName: user.displayName
    }).
    then( () => console.log('User update'))
    .catch(err => console.log('Error', err));
  }



}
