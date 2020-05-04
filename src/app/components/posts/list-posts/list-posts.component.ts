import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { UserI } from '../../../shared/models/user.interface';
import {PostService} from '../../posts/post.service';
import { PostI } from '../../../shared/models/post.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})
export class ListPostsComponent implements OnInit {
public posts$: Observable<PostI[]>;
public userName: string;

  constructor(private postSvc: PostService, public authSvc: AuthService) { }

  ngOnInit() {
    this.userName=this.authSvc.getUserName();
    console.log('user '+this.userName);
    this.posts$ = this.postSvc.getPostsFiltered(this.userName);
  }

}
