import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
    ],
    exports: [
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
    ]
})
export class SharedModule { }
//One component can only be added declarations of exactly one @NgModule().
//Make it a SharedModule and add this module to imports where you want to use the elements the module exports.
//https://stackoverflow.com/questions/45223496/reexporting-the-commonmodule-is-required-when-we-import-browsermodule-at-app-sta
//exports doesnt export declarations of the module, thus, CommonModule is not exported but it must be imported in every module that uses them!
//CommonModule is imported here because UserManagementComponent needs it.