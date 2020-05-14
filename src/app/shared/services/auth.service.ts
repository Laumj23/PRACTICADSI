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
//funcion para loggear a un usuario usando el email y password
  loginByEmail(user: UserI) {
    const { email, password } = user;
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((credential) => {
        this.updateUserData(credential.user);
      });
  }
//permita salir de la cuenta
  async logout() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }
//actualiza los datos del usuario
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
//preguarda un usuario y lo prepara para guardarlo en caso de que tenga imagen de perfil o no
  preSaveUserProfile(user: UserI, image?: FileI): void {
    if (image) {
      this.saveUserProfile(user, image);
    } else {
      this.saveUserProfile(user);
    }

  }
//sube la imagen de usuario a firebase
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
//guarda la configuracion de usuario: nombre y foto de perfil
 async saveUserProfile(user: UserI, image?: FileI) {
    (await this.afAuth.currentUser).updateProfile({
      displayName: user.displayName,
      photoURL: user.photoURL
    }).
    then( () => console.log('User update'))
    .catch(err => console.log('Error', err));
  }
//obtener la imagen de un perfil
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
//comprueba que el usuario corresponde con un doctor
  isDoctor(user: UserI): boolean {
    const allowed = ['doctor'];
    return this.checkAuthorization(user, allowed);
  }
//registra a un usuario con el email y la contraseña
  async register(user: UserI) {
    const { email, password } = user;
    var result = await this.afAuth.createUserWithEmailAndPassword(email, password);
}
//confirma los roles
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
