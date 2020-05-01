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

  constructor(private postSvc: PostService) { }

//formulario de nuevo post
  public newPostForm = new FormGroup({
    titlePost: new FormControl('',Validators.required),
    contentPost: new FormControl('',Validators.required),
    data: new FormControl('', Validators.required)
  })

  ngOnInit() {
  }
//añadir nuevo post
  addNewPost(data: PostI){
    console.log('New post', data);
    this.postSvc.savePost(data);
  }
//conseguir imagen

}
