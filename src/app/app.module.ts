import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { LayoutModule } from '@angular/cdk/layout';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
// npm i @angular/material-moment-adapter
// npm i -S moment

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { UsersListComponent } from './components/users-list/users-list.component';
import { UserManagementComponent, DateFormats } from './components/user-management/user-management.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { RootStoreModule } from './root-store/root-store.module';

import { TransformAddressPipe } from './pipes/transform-address';

@NgModule({
    declarations: [
        AppComponent,
        UsersListComponent,
        UserManagementComponent,
        LayoutComponent,
        HeaderComponent,
        SideNavigationComponent,
        TransformAddressPipe
    ],
    imports:
        [
            BrowserModule,
            AppRoutingModule,
            BrowserAnimationsModule,
            FormsModule,
            ReactiveFormsModule,
            FlexLayoutModule,
            MaterialModule,
            RootStoreModule,
            AngularFireModule.initializeApp(environment.firebase),
            AngularFirestoreModule,
            LayoutModule
        ],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: DateFormats }
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
