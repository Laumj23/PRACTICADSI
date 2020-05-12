import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/Operators';
import { PostI } from '../../shared/models/post.interface';
import { FileI } from '../../shared/models/file.interface';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postCollection: AngularFirestoreCollection<PostI>;
  private filePath: any;
  private downloadURL: Observable<string>;


  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.postCollection = afs.collection<PostI>('posts');
  }

  public getAllPosts(): Observable<PostI[]> {
    return this.postCollection
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as PostI;
          const id = a.payload.doc.id;
          return {id, ...data};
      })
    )
    );
  }
// obtener un post
public getOnePost(id: PostI): Observable<PostI> {
  return this.afs.doc<PostI>(`posts/${id}`).valueChanges();
}
// borrar un post
public deletePostbyID(post: PostI) {
  return this.postCollection.doc(post.id).delete();
}
// editar un post
public editPostbyID(post: PostI) {
    return this.postCollection.doc(post.id).update(post);
}

// guardar un post
public savePost(post1: PostI, post2?: PostI) {
  const postObj = {
    titlePost: post1.titlePost,
    data: post1.data,
    user: post1.user,
    contentPost:post1.contentPost,
    id: post1.id
  };
  this.postCollection.doc(post2.id).update(post2);
  this.postCollection.add(postObj);


}
//posts filtrados
public getPostsFiltered(userName: string): Observable<PostI[]> {
  console.log('filtered ' + userName);
  return this.afs.collection<PostI>('posts', ref => ref.where('user', '==', userName))
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as PostI;
          const id = a.payload.doc.id;
          return {id, ...data};
    })
  )
  );
}

public getPostsModel(): Observable<PostI[]> {
  console.log('filtered ');
  return this.afs.collection<PostI>('posts', ref => ref.where('user', '==', 'none'))
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as PostI;
          const id = a.payload.doc.id;
          return {id, ...data};
    })
  )
  ); }

}
