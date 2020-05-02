import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/Operators';
import { CitaI } from '../../shared/models/cita.interface';
import { UserI } from '../../shared/models/user.interface';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private citaCollection: AngularFirestoreCollection<CitaI>;
  private userCollection: AngularFirestoreCollection<UserI>;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.citaCollection = afs.collection<CitaI>('citas');
    this.userCollection = afs.collection<UserI>('users');
  }

  public getAllCitas(): Observable<CitaI[]> {
    return this.citaCollection
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as CitaI;
          const id = a.payload.doc.id;
          return {id, ...data};
      })
    )
    );
  }
  // Obtener una cita
  public getOneCita(id: CitaI, uid: UserI): Observable<CitaI> {
    return this.afs.doc<CitaI>(`citas/${id}`).valueChanges();
  }

  public getCitasByUser(uid: UserI): Observable<CitaI[]> {
    return this.afs.collection<CitaI>
      ('citas', ref => ref.where('user', '==', uid)).valueChanges();
  }
}
