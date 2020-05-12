import { Component, OnInit, Inject } from '@angular/core';
import { CitaService } from 'src/app/components/cita/cita.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CitaI } from 'src/app/shared/models/cita.interface';
import { UserI } from 'src/app/shared/models/user.interface';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { firestore } from 'firebase';

interface DialogData {
  data: CitaI;
}

interface Consulta {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-new-cita',
  templateUrl: './new-cita.component.html',
  styleUrls: ['./new-cita.component.scss']
})
export class NewCitaComponent implements OnInit {

  consultas: Consulta[] = [
    {value: 'Atención primaria', viewValue: 'Atención primaria'},
    {value: 'Atención especializada', viewValue: 'Atención especializada'}
  ];

  constructor(public dialog: MatDialog, private citaSvc: CitaService, private authSvc: AuthService) { }

  public currentImage: string;

  public newCitaForm = new FormGroup({
    centro: new FormControl('', Validators.required),
    consulta: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    doctor: new FormControl('', Validators.required),
    user: new FormControl('', Validators.required),
    id: new FormControl('', Validators.required)
  });

  addNewCita(data: CitaI) {
    console.log('New cita', data);
    this.citaSvc.newCita(data);
  }

  public initValuesForm(user: UserI): void {
    this.newCitaForm.patchValue({
      user: user.uid,
      centro: user.centro,
      doctor: 'Teresa Rodríguez',
      id: 'cita123loco'
    });
  }

  ngOnInit() {
    this.currentImage = this.authSvc.getUserImage();
    this.authSvc.userData$.subscribe(user => {
      this.initValuesForm(user);
    });
  }

  openDialog(data: CitaI): void {
    const dialogRef = this.dialog.open(DialogNewCita, {
      width: '250px',
      data: {data}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      this.addNewCita(data);
    });
  }

}

@Component({
  selector: 'app-dialog-new-cita',
  templateUrl: 'dialog-new-cita.html'
})
export class DialogNewCita {

  constructor(
    public dialogRef: MatDialogRef<DialogNewCita>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
