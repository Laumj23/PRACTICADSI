import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { PostI } from '../../../shared/models/post.interface';
import { PostService } from './../post.service';
import { AuthService } from '../../../shared/services/auth.service';
import { UserI } from '../../../shared/models/user.interface';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  @Input() post: PostI;
  public postControl: PostI;


  constructor(private postSvc: PostService, private authSvc: AuthService) { }

  public editPostForm = new FormGroup({
    id:new FormControl('', Validators.required),
    titlePost:new FormControl({value: '', disabled : true}, Validators.required),
    contentPost:new FormControl('', Validators.required),
    data:new FormControl('', Validators.required),
    user:new FormControl('', Validators.required)

  });

  ngOnInit() {
    this.initValuesForm();
    this.authSvc.userData$.subscribe(user =>{
    this.initValuesUser(user);
    });
    this.postControl = {
      titlePost: this.post.titlePost,
      id: this.post.id,
      contentPost: this.post.contentPost,
      data: 0,
      user: 'none'
    };
  }

  editPost(post: PostI){
      this.postSvc.savePost(post, this.postControl);

  }

  private initValuesForm():void{
    this.editPostForm.patchValue({
      id: this.post.id,
      titlePost: this.post.titlePost,
      data: this.post.data

    })
  }
  //coger el usuario registrado
    private initValuesUser(user: UserI): void {
        this.editPostForm.patchValue({
          user: user.displayName,
      });
    }
}
