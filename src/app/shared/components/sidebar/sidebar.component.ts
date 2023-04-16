import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() authUser!: User;
  @Input() hidden!: boolean;
  @Input() searchTerm!: string;
  @Input() listItems!: any[] | null;

  @Output() selectedObject = new EventEmitter<any>();
  @Output() selectedFilters = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {
  }

  ReceiveSelectedObject(event: any) {
    this.selectedObject.emit(event);
  }

  ReceiveSelectedFilters(event: any) {
    this.selectedFilters.emit(event);
  }
}
