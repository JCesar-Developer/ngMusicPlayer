//ANGULAR CORE
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//NECESARIO
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { FormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';


//NO NECESARIO
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [],

  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports:[
    //NECESARIOS
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressBarModule,
    FormsModule,
    TextFieldModule,

    //NO NECESARIOS
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatDividerModule,

  ]
})

export class MaterialModule { }
