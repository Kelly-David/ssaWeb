import { Component, Input, OnChanges } from '@angular/core';
import { User } from '../../shared/models/user';

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
