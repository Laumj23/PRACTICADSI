import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostI } from '../../../shared/models/post.interface';
import { PostService } from '../post.service'

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  private image: any;
  constructor(private postSvc: PostService) { }

//formulario de nuevo post
  public newPostForm = new FormGroup({
    titlePost: new FormControl('',Validators.required),
    contentPost: new FormControl('',Validators.required),
    tagsPost: new FormControl('',Validators.required),
    imagePost: new FormControl('',Validators.required),
  })

  ngOnInit() {
  }
//añadir nuevo post
  addNewPost(data: PostI){
    console.log('New post', data);
    this.postSvc.preAddAndUpdatePost(data, this.image);
  }
//conseguir imagen
  handleImage(event: any): void{
    this.image = event.target.files[0];
  }

}
