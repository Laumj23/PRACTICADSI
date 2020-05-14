import { Component, OnInit, ViewChild } from '@angular/core';
import {PostService} from '../../posts/post.service';
import { PostI } from '../../../shared/models/post.interface';
import { Observable } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';
import { UserI } from '../../../shared/models/user.interface';
import { TableComponent } from '../../../shared/components/table/table.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public posts$: Observable<PostI[]>;
  public userName: string;
  public currentImage: string;

  constructor(private postSvc: PostService, public authSvc: AuthService) { }

  ngOnInit() {
    this.authSvc.userData$.subscribe(user => {
      this.userName = user.displayName;
      this.posts$ = this.postSvc.getPostsFiltered(user.displayName);
      this.currentImage = this.authSvc.getUserImage();
    });
  }

}
