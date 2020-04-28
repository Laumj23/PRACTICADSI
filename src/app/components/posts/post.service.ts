import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map,finalize } from 'rxjs/Operators';
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

  public getAllPosts():Observable<PostI[]>{
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
    )
  }
//obtener un post
public getOnePost(id:PostI):Observable<PostI>{
  return this.afs.doc<PostI>(`posts/${id}`).valueChanges();
}
//borrar un post
public deletePostbyID(post: PostI){
  return this.postCollection.doc(post.id).delete();
}
//editar un post
public editPostbyID(post: PostI, newImage?: FileI){
  if(newImage){
    this.uploadImage(post, newImage);
  }else{
    return this.postCollection.doc(post.id).update(post);
  }
}
//preparar un post que se va a crear o actualizar
public preAddAndUpdatePost(post: PostI, image: FileI): void{
  this.uploadImage(post, image);

}
//guardar un post
private savePost(post: PostI){
  const postObj = {
    titlePost: post.titlePost,
    contentPost: post.contentPost,
    imagePost: this.downloadURL,
    fileRef: this.filePath,
    tagsPost: post.tagsPost
  };
  if(post.id){
    return this.postCollection.doc(post.id).update(postObj);
  }else{
    return  this.postCollection.add(postObj);
  }


}
//subir una imagen al storage de firebase
private uploadImage(post: PostI, image: FileI ){
  this.filePath = `images/${image.name}`;
  const fileRef = this.storage.ref(this.filePath);
  const task =  this.storage.upload(this.filePath, image);
  task.snapshotChanges()
  .pipe(
    finalize(()=>{
      fileRef.getDownloadURL().subscribe(urlImage => {
        this.downloadURL = urlImage;
        this.savePost(post);

      });
    })
  ).subscribe();
}

}
