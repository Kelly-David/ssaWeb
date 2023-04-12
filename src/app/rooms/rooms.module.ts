import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsBaseComponent } from './rooms-base/rooms-base.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomItemComponent } from './room-item/room-item.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    RoomsBaseComponent,
    RoomsComponent,
    RoomItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class RoomsModule { }
