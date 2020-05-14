import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PostService } from '../../../components/posts/post.service';
import { PostI } from '../../models/post.interface';
import { Observable } from 'rxjs';
import { MatDialog } from  '@angular/material/dialog';
import { ModalComponent } from  './../modal/modal.component';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['titlePost', 'actions'];
  dataSource = new MatTableDataSource();
  public posts$: Observable<PostI[]>;

  constructor(private postSvc: PostService, public dialog: MatDialog) { }

  ngOnInit(){
    this.posts$ = this.postSvc.getPostsModel();
  }

  ngAfterViewInit(){
}
//llama a la funcion para editar el post y añadir los valores nuevos a las actividades
  onEditPost(post:PostI){
    console.log('Edit post', post);
    this.openNewPostDialog(post);
  }

//abre el dialogo del pop-up
  openNewPostDialog(post?:PostI):void{
    const config = {
      data:{
        message: post ? 'Edit Post' : 'New Post',
        content: post
      }
    };

    const dialogRef = this.dialog.open(ModalComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result ${ result }`);
    });

  }


}
