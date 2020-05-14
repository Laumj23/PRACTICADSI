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
public image: FileI;
public currentImage: string;

  constructor(private authSvc: AuthService) { }

//formulario para cambiar el nombre del usuario
  public profileForm = new FormGroup({
    displayName: new FormControl('', Validators.required),
    email: new FormControl({value: '', disabled : true}, Validators.required),
    photoURL: new FormControl('', Validators.required)
  });

  ngOnInit() {
    //cogemos el usuario que esta actualmente loggeado
    this.authSvc.userData$.subscribe(user => {
      this.initValuesForm(user);
    });
  }
//cada vez que damos al boton de guardar cambios se llama a esta funcion
onSaveUser(user: UserI): void {
  //a su vez llama a la funcion preSaveUserProfile que se encuentra en el servicio de autenticidad
  this.authSvc.preSaveUserProfile(user, this.image);
}
//inicia unos valores predeterminados en el formulario que guarda
//los valores que se encuentran actualmente antes de ser cambiados
private initValuesForm(user: UserI): void {
  if (user.photoURL) {
    this.currentImage = user.photoURL;
  }
  this.profileForm.patchValue({
    roles: user.roles,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL
  });
}
//funcion para coger la imagen del usuario
handleImage(image: FileI) {
  this.image = image;
}

}
