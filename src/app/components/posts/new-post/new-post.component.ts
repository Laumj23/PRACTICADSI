import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostI } from '../../../shared/models/post.interface';
import { UserI } from '../../../shared/models/user.interface';
import { PostService } from '../post.service'
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  public userName: string;

  constructor(private postSvc: PostService, private authSvc: AuthService) { }

  ngOnInit() {
    this.authSvc.userData$.subscribe(user =>{
    this.initValuesForm(user);
    });

  }
  //formulario de nuevo post
    public newPostForm = new FormGroup({
      titlePost: new FormControl('',Validators.required),
      contentPost: new FormControl('',Validators.required),
      data: new FormControl ('', Validators.required),
      user: new FormControl('', Validators.required)
    })

//coger el usuario registrado
  private initValuesForm(user: UserI): void {
      this.newPostForm.patchValue({
        user: user.displayName,
    });
  }

//añadir nuevo post
  addNewPost(data: PostI){
    console.log('New post', data);
    this.postSvc.savePost(data);
  }
//conseguir imagen

}
