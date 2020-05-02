import { Component, OnInit } from '@angular/core';
import {PostService} from '../../posts/post.service';
import { PostI } from '../../../shared/models/post.interface';
import { Observable } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';
import { UserI } from '../../../shared/models/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

public posts$: Observable<PostI[]>;



  constructor(private postSvc: PostService, public authSvc: AuthService) { }

  ngOnInit() {
    this.posts$ = this.postSvc.getAllPosts();
  }

}
