import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { UserI } from './shared/models/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'HelseApp';

  public user: UserI;

  constructor(private authSvc: AuthService) { }

  ngOnInit() {
    this.authSvc.userData$.subscribe(user => {
      this.user = user;
    });
  }
}
