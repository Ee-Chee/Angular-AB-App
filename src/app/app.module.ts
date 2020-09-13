import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from '@angular/cdk/layout';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { UsersListComponent } from './components/users-list/users-list.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';

import { RootStoreModule } from './root-store/root-store.module';

import { TransformAddressPipe } from './pipes/transform-address';

@NgModule({
    declarations: [
        AppComponent,
        UsersListComponent,
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
            SharedModule,
            LayoutModule,
            RootStoreModule,
            AngularFireModule.initializeApp(environment.firebase),
            AngularFirestoreModule,
        ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
