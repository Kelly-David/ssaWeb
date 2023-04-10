import { Component, Input, OnChanges } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnChanges {

  @Input() user!: User;

  constructor() { }

  ngOnChanges(): void {

  }

}
