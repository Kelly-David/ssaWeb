import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user';
import { PageType } from 'src/app/models/web';

@Component({
  selector: 'app-view-nav',
  templateUrl: './view-nav.component.html',
  styleUrls: ['./view-nav.component.scss']
})
export class ViewNavComponent implements OnInit {

  @Input() authUser!: User;
  @Input() title!: string;
  @Input() pageType!: PageType;

  @Output() sidebarState = new EventEmitter<boolean>();
  @Output() searchTermState = new EventEmitter<string>();

  public hideSidebar: boolean = false;
  public searchTerm: string = '';

  constructor() { }

  ngOnInit(): void {


  }

  public SetSidebarState(state: boolean): void {
    this.hideSidebar = state;
    this.sidebarState.emit(this.hideSidebar);
  }

  public SetSearchTerm(term: any): void {
    this.searchTermState.emit(this.searchTerm);
  }

}
