import { Component, Input, OnInit } from '@angular/core';
import { Room } from 'src/app/models/room';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  @Input() rooms!: Room[];

  constructor() { }

  ngOnInit(): void {
  }

}
