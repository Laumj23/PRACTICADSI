import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule,
          MatButtonModule,
          MatMenuModule,
          MatToolbarModule,
          MatIconModule,
          MatSidenavModule,
          MatListModule,
          MatProgressSpinnerModule,
          MatDividerModule,
          MatChipsModule,
          MatFormFieldModule,
          MatInputModule,
          MatTableModule,
          MatPaginatorModule,
          MatSortModule,
          MatDialogModule,
          MatSelectModule,
          MatProgressBarModule
          } from '@angular/material';

const myModule = [
           MatCardModule,
           MatButtonModule,
           MatMenuModule,
           MatToolbarModule,
           MatIconModule,
           MatSidenavModule,
           MatListModule,
           MatProgressSpinnerModule,
           MatDividerModule,
           MatChipsModule,
           MatFormFieldModule,
           MatInputModule,
           MatTableModule,
           MatPaginatorModule,
           MatSortModule,
           MatDialogModule,
           MatSelectModule,
           MatProgressBarModule
]

@NgModule({
  declarations: [],
  imports: [CommonModule, myModule, FlexLayoutModule],
  exports: [myModule]
})
export class MaterialModule { }
