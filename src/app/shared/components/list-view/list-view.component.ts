import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Room } from 'src/app/models/room';
import { Student } from 'src/app/models/students';
import { User } from 'src/app/models/user';
import { ListItem } from 'src/app/models/web';
import { ViewStateService } from 'src/app/services/view-state.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnChanges {

  @Input() inputItems!: any[];

  public listItems!: ListItem[];

  constructor(private viewStateService: ViewStateService) { }

  ngOnChanges(): void {

    this.listItems = this.inputItems?.map(item => {

      if (item instanceof User) {
        return {
          Id: item.Id,
          DisplayName: item.FullName,
          Object: item
        } as ListItem;
      }
      else if (item instanceof Student) {
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

    if (this.listItems?.length > 0) {
      this.SetSelectedItem(this.listItems[0].Object);
    }
  }

  SetSelectedItem(object: User | Student | Room | any) {

    if (object instanceof Student) {
      return this.viewStateService.setSelectedStudent(object);
    }

    if (object instanceof User) {
      return this.viewStateService.setSelectedUser(object);
    }
  }

}
