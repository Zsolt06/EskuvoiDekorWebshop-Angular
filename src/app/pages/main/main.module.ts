import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MaterialModule } from '../../material-module';
import { FormatPricePipe } from '../../shared/pipes/format-price.pipe';
import { SelectChildComponent } from './select-child/select-child.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MainComponent,
    FormatPricePipe,
    SelectChildComponent,
    SelectChildComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    FormsModule,
  ]
})
export class MainModule { }
