import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/Operators';
import { CitaI } from '../../shared/models/cita.interface';
import { FileI } from '../../shared/models/file.interface';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private citaCollection: AngularFirestoreCollection<CitaI>;
  private filePath: any;
  private downloadURL: Observable<string>;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
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
  // Borrar una cita
  public deleteCitabyID(cita: CitaI) {
    return this.citaCollection.doc(cita.id).delete();
  }
}
