import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UserInfosRoutingModule } from './user-infos-routing.module';

@NgModule({
    declarations: [],
    imports: [
        UserInfosRoutingModule,
        SharedModule,
        CommonModule
    ]
})
export class UserInfosModule { }
