import { Injectable } from '@angular/core';
import { UserI } from '../models/user.interface';
import { FileI } from '../models/file.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, switchMap } from 'rxjs/Operators';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userData$: Observable<UserI>;
  private uid: string;
  private filePath: string;
  private userName: string;
  private photoURL: string;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private storage: AngularFireStorage) {

    this.userData$ = afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<UserI>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  loginByEmail(user: UserI) {
    const { email, password } = user;
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((credential) => {
        this.updateUserData(credential.user);
      });
  }

  async logout() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: UserI = {
      uid: user.uid,
      email: user.email,
      roles: {
        user: true
      }
    };
    return userRef.set(data, { merge: true });
  }

  preSaveUserProfile(user: UserI, image?: FileI): void {
    if (image) {
      this.saveUserProfile(user, image);
    } else {
      this.saveUserProfile(user);
    }

  }

  private uploadImage(user: UserI, image: FileI): void {
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
    .pipe(
      finalize( () => {
        fileRef.getDownloadURL().subscribe(urlImage => {
          user.photoURL = urlImage;
          this.saveUserProfile(user);
        });
      })
    ).subscribe();
  }

 async saveUserProfile(user: UserI, image?: FileI) {
    (await this.afAuth.currentUser).updateProfile({
      displayName: user.displayName,
      photoURL: user.photoURL
    }).
    then( () => console.log('User update'))
    .catch(err => console.log('Error', err));
  }

  public getUserID(): string {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.uid = user.uid;
      } else {
        // User not logged in or has just logged out.
      }
    });
    return this.uid;
  }

  public getUserName(): string {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userName = user.displayName;

      } else {
        console.log('funciona?' + this.userName);
      }
    });
    return this.userName;
  }
  public getUserImage(): string {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.photoURL = user.photoURL;

      } else {
      console.log('funciona?' + this.userName);
      }
    });
    return this.photoURL;
  }

  canRead(user: UserI): boolean {
    const allowed = ['doctor', 'user'];
    return this.checkAuthorization(user, allowed);
  }

  private checkAuthorization(user: UserI, allowedRoles: string[]): boolean {
    if (!user) {
      return false;
    }
    for (const role of allowedRoles) {
      if ( user.roles[role] ) {
        return true;
      }
    }
    return false;
  }

}
