import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { PostI } from '../../../shared/models/post.interface';
import { PostService } from './../post.service';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  @Input() post: PostI;

  constructor(private postSvc: PostService) { }

  public editPostForm = new FormGroup({
    id:new FormControl('', Validators.required),
    titlePost:new FormControl({value: '', disabled : true}, Validators.required),
    data:new FormControl('', Validators.required),
    user:new FormControl('', Validators.required)

  });

  ngOnInit() {
    this.initValuesForm();
  }

  editPost(post: PostI){
      this.postSvc.savePost(post);

  }

  private initValuesForm():void{
    this.editPostForm.patchValue({
      id: this.post.id,
      titlePost: this.post.titlePost,
      data: this.post.data

    })
  }
}
