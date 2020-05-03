import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { Observable } from 'rxjs';
import { PostI } from 'src/app/shared/models/post.interface';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
    public post$: Observable<PostI>;

    constructor(private route: ActivatedRoute, private postSvc: PostService,public authSvc: AuthService) { }

  ngOnInit() {
    const idPost = this.route.snapshot.params.id;


    this.post$ = this.postSvc.getOnePost(idPost);
  }

}
