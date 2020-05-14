import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AvisoI } from 'src/app/shared/models/aviso.interface';
import { map } from 'rxjs/Operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvisoService {

  constructor(private afs: AngularFirestore) { }

  // Obtiene los avisos corrspondientes a un usuario
  public getAvisosByUser(uid: string) {
    // Además los ordena por fecha de manera descendente
    return this.afs.collection<AvisoI>('avisos', ref => ref.where('user', '==', uid).orderBy('date', 'desc'))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as AvisoI;
            const id = a.payload.doc.id;
            return {id, ...data};
      })
    )
    );
  }
}
