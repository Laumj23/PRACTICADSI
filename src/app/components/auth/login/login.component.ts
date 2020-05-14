import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { UserI } from '../../../shared/models/user.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
//con este componente se puede loggear un usuario
export class LoginComponent implements OnInit {
//inicializamos el servicio de autenticidad y el elemento que nos deja
//hacer rutas para navegar sobre nuestro sistema
  constructor(private authSvc: AuthService, private router: Router) { }
//formulario de log in: cogemos el email y la password
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngOnInit() { }
//llamamos a esta función que a su vez llama a la funcion loginbyemail en el servicio autenticidad
  onLogin(form: UserI) {
    this.authSvc.loginByEmail(form)
    .then(res => {
      console.log('Succesfully', res); //si nos loggeamos correctamente nos redirige a la pagina de resumen (home)
      this.router.navigate(['/home']);
    })
    .catch (err => console.log('Error', err));
  }
}
