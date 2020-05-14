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
//con este componente se puede registre un nuevo usuario
export class RegisterComponent implements OnInit {
  //inicializamos el servicio de autenticidad y el elemento que nos deja
  //hacer rutas para navegar sobre nuestro sistema
  constructor(private authSvc: AuthService, private router: Router) { }
//creamos el formulario de registro
  registerForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  ngOnInit() {
  }
  //cada vez que se pulse el boton de registrar se llamará a esta funcion que llama
  // a la funcion de registro de autenticidad donde se guardará el usuario nuevo
  registerUser(form: UserI){
    this.authSvc.register(form)
    .then(res => {
      console.log('Succesfully', res); //si se registra correctamente
      this.router.navigate(['/login']);  //nos redigirá a la pagina de login para loggearnos
    })
    .catch (err => console.log('Error', err));
  }
}
