import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Room } from 'src/app/models/room';
import { Student } from 'src/app/models/students';
import { User } from 'src/app/models/user';
import { ListItem } from 'src/app/models/web';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnChanges {

  @Input() inputItems!: any[];
  @Output() SelectedItemChange = new EventEmitter<any>();

  public listItems!: ListItem[];

  constructor() { }

  ngOnChanges(): void {

    this.listItems = this.inputItems?.map(item => {

      if (item instanceof User) {
        return {
          Id: item.Id,
          DisplayName: item.FullName,
          Object: item
        } as ListItem;
      }
      else {
        throw new Error('Unknown item type');
      }
    });
  }

  SetSelectedItem(object: User | Student | Room | any) {
    this.SelectedItemChange.emit(object);
  }

}
