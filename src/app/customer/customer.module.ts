import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommissionComponent } from './commission/commission.component';
import { CustomerRouting } from './customer-routing.module';




@NgModule({

  declarations: [CommissionComponent],
  imports: [
    CommonModule,
  
    CustomerRouting
  ]
})
export class CustomerModule { }