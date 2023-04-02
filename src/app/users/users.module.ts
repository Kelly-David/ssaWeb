import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { SharedModule } from '../shared/shared.module';
import { UserListItemComponent } from './user-list-item/user-list-item.component';
import { UserItemComponent } from './user-item/user-item.component';
import { UserBaseComponent } from './user-base/user-base.component';



@NgModule({
  declarations: [
    UsersComponent,
    UserListItemComponent,
    UserItemComponent,
    UserBaseComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class UsersModule { }
