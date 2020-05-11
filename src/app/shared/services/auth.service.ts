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
  private uid: string;
  private filePath: string;
  private userName: string;
  private photoURL: string;

  constructor(private afAuth: AngularFireAuth,
              private storage: AngularFireStorage) {
    this.userData$ = afAuth.authState;

   }


  loginByEmail(user: UserI) {
    const { email, password } = user;
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.afAuth.signOut();
  }

  preSaveUserProfile(user: UserI, image?: FileI): void {
    if(image){
        this.saveUserProfile(user, image);
    }else{
      this.saveUserProfile(user);
    }

  }
  private uploadImage(user: UserI, image:FileI): void{
    this.filePath=`images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
    .pipe(
      finalize( ()=> {
        fileRef.getDownloadURL().subscribe(urlImage => {
          user.photoURL = urlImage;
          this.saveUserProfile(user);
        });
      })
    ).subscribe();
  }

 async saveUserProfile(user: UserI, image?:FileI) {
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



}
