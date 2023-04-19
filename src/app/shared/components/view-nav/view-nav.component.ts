import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { PageType } from 'src/app/models/web';
import { ViewStateService } from 'src/app/services/view-state.service';

@Component({
  selector: 'app-view-nav',
  templateUrl: './view-nav.component.html',
  styleUrls: ['./view-nav.component.scss']
})
export class ViewNavComponent implements OnInit {

  @Input() authUser!: User;
  @Input() title!: string;
  @Input() pageType!: PageType;

  @Output() searchTermState = new EventEmitter<string>();

  public sidebarState!: Observable<boolean>;
  public searchTerm: string = '';

  constructor(private viewStateService: ViewStateService) { }

  ngOnInit(): void {
    this.sidebarState = this.viewStateService.getSidebarState();
  }

  public SetSidebarState(state: boolean): void {
    this.viewStateService.setSidebarState(state);
  }

  public SetSearchTerm(term: any): void {
    this.searchTermState.emit(this.searchTerm);
  }

}
