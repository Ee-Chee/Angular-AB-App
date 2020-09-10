import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AddressBookStoreModule } from './address-book-store';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AddressBookStoreModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
    ]
})

export class RootStoreModule { }
