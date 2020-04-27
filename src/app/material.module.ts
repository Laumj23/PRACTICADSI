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
          MatSelectModule
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
           MatSelectModule
]

@NgModule({
  declarations: [],
  imports: [CommonModule, myModule, FlexLayoutModule],
  exports: [myModule]
})
export class MaterialModule { }
