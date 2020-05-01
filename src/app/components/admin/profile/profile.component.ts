import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../../../shared/services/auth.service';
import { UserI } from './../../../shared/models/user.interface';
import { FileI } from './../../../shared/models/file.interface';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  constructor(private authSvc: AuthService) { }

  public profileForm = new FormGroup({
    displayName: new FormControl('', Validators.required),
    email: new FormControl({value: '', disabled : true}, Validators.required)
  });

  ngOnInit() {
    this.authSvc.userData$.subscribe(user => {
      this.initValuesForm(user);

    });
  }
onSaveUser(user: UserI): void {
  this.authSvc.preSaveUserProfile(user);
}

private initValuesForm(user: UserI): void {
  this.profileForm.patchValue({
    displayName: user.displayName,
    email: user.email
  });
}


}
