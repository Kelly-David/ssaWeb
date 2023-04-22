import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { take } from 'rxjs/operators';
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

      var current: any = undefined;

      if (this.listItems[0]?.Object instanceof Student) {
        this.viewStateService.getSelectedStudent().pipe(take(1)).subscribe(item => {

          if(Object.keys(item).length > 0) {
            current = this.listItems.find(i => i.Id === item.Id);
          }
        })
      }

      this.SetSelectedItem(this.listItems[0].Object);

      if (current !== undefined) {
        this.SetSelectedItem(current.Object);
      }
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
