import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UserItemComponent } from './user-item/user-item.component';
import { UserBaseComponent } from './user-base/user-base.component';
import { AddUserComponent } from './add-user/add-user.component';



@NgModule({
  declarations: [
    UserItemComponent,
    UserBaseComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class UsersModule { }
