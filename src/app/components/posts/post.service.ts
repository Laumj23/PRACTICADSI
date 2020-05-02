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
public savePost(post: PostI) {
  const postObj = {
    titlePost: post.titlePost,
    contentPost: post.contentPost,
    data: post.data,
    user: post.user
  };
  if(post.id){
    return  this.postCollection.doc(post.id).update(postObj);
  }else{
    this.postCollection.add(postObj);
  }

}

}
