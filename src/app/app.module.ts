import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { UsersListComponent } from './components/users-list/users-list.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';

@NgModule({
    declarations: [
        AppComponent,
        UsersListComponent,
        UserManagementComponent,
        LayoutComponent,
        HeaderComponent,
        SideNavigationComponent
    ],
    imports:
        [
            BrowserModule,
            AppRoutingModule,
            BrowserAnimationsModule,
            FormsModule,
            ReactiveFormsModule,
            FlexLayoutModule,
            MatToolbarModule,
            MatButtonToggleModule,
            MatSidenavModule,
            MatButtonModule,
            MatIconModule,
            MatListModule
        ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
