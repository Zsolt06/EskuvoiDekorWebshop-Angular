import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MaterialModule } from '../../material-module';
import { FormatPricePipe } from '../../shared/pipes/format-price.pipe';

@NgModule({
  declarations: [
    MainComponent,
    FormatPricePipe
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule
  ]
})
export class MainModule { }
