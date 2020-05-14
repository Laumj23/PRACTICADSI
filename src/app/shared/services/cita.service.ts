import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/Operators';
import { CitaI } from '../models/cita.interface';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private citaCollection: AngularFirestoreCollection<CitaI>;

  constructor(private afs: AngularFirestore,
              private storage: AngularFireStorage) {
    this.citaCollection = afs.collection<CitaI>('citas');
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
  public getOneCita(id: CitaI): Observable<CitaI> {
    return this.afs.doc<CitaI>(`citas/${id}`).valueChanges();
  }

  public getCitasFiltered(uid: string): Observable<CitaI[]> {
    console.log('filtered ' + uid);
    return this.afs.collection<CitaI>('citas', ref => ref.where('user', '==', uid))
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

  public getCitasDoctor(docName: string): Observable<CitaI[]> {
    console.log('cositas ' + docName);
    return this.afs.collection<CitaI>('citas', ref => ref.where('doctor', '==', docName))
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

  public newCita(cita: CitaI) {
    const citaObj = {
      centro: cita.centro,
      consulta: cita.consulta,
      date: cita.date,
      doctor: cita.doctor,
      user: cita.user,
      id: cita.id,
      detalles: cita.detalles
    };
    this.citaCollection.add(citaObj);
  }
}
