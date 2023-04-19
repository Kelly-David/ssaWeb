import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { ViewStateService } from '../../../services/view-state.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() authUser!: User;
  @Input() searchTerm!: string;
  @Input() listItems!: any[] | null;

  @Output() selectedObject = new EventEmitter<any>();
  @Output() selectedFilters = new EventEmitter<any>();

  public sidebarState!: Observable<boolean>;

  constructor(private viewStateService: ViewStateService) { }

  ngOnInit(): void {
    this.sidebarState = this.viewStateService.getSidebarState();
  }

  ReceiveSelectedObject(event: any) {
    this.selectedObject.emit(event);
  }

  ReceiveSelectedFilters(event: any) {
    this.selectedFilters.emit(event);
  }
}
