import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PostService } from '../../../components/posts/post.service';
import { PostI } from '../../models/post.interface';
import { MatDialog } from  '@angular/material/dialog';
import { ModalComponent } from  './../modal/modal.component';
import { DeleteDialogComponent } from  './../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['titlePost', 'tagsPost', 'actions'];
  dataSource = new MatTableDataSource();

@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
@ViewChild(MatSort, {static:true}) sort: MatSort;

  constructor(private postSvc: PostService, public dialog: MatDialog) { }

  ngOnInit(){
    this.postSvc.getAllPosts().subscribe(posts => (this.dataSource.data=posts));
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
}


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDeletePost(post:PostI){
    this.openDeleteDialog(post);
    console.log('Delete post', post);
  }
  onEditPost(post:PostI){
    console.log('Edit post', post);
    this.openNewPostDialog(post);
  }
  onNewPost(post:PostI){
    this.openNewPostDialog();
    console.log('New post', post);
  }
  openDeleteDialog(post:PostI): void{
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result ${ result }`);
      if(result == true){
        this.postSvc.deletePostbyID(post);
      }
    })
  }
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
