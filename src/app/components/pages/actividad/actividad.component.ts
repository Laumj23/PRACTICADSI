import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { UserI } from '../../../shared/models/user.interface';
import {PostService} from '../../posts/post.service';
import { PostI } from '../../../shared/models/post.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.scss']
})
export class ActividadComponent implements OnInit {

  public posts$: Observable<PostI[]>;
  public currentImage: string;

  constructor(private postSvc: PostService, public authSvc: AuthService) { }

  ngOnInit() {
    // La página identifica al usuario conectado
    this.authSvc.userData$.subscribe(user => {
      this.posts$ = this.postSvc.getPostsFiltered(user.displayName);
      this.currentImage = this.authSvc.getUserImage();
    });
  }

}
