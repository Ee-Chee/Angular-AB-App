import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RegistrationRoutingModule } from './registration-routing.module';

@NgModule({
    declarations: [],
    imports: [
        RegistrationRoutingModule,
        SharedModule,
        CommonModule
    ]
})
export class RegistrationModule { }
