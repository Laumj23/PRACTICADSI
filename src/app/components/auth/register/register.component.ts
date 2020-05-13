import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { UserI } from '../../../shared/models/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  constructor(private authSvc: AuthService, private router: Router) { }

  registerForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  ngOnInit() {
  }
  registerUser(form: UserI){
    this.authSvc.register(form)
    .then(res => {
      console.log('Succesfully', res);
      this.router.navigate(['/login']);
    })
    .catch (err => console.log('Error', err));
  }
}
