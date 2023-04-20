import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/app/models/students';
import { User } from 'src/app/models/user';
import { ViewStateService } from 'src/app/services/view-state.service';

@Component({
  selector: 'app-student-item',
  templateUrl: './student-item.component.html',
  styleUrls: ['./student-item.component.scss']
})
export class StudentItemComponent implements OnInit, OnChanges {

  @Input() authUser!: User;
  @Input() student!: Student

  public vitalsEditMode!: Observable<boolean>;

  constructor(private viewStateService: ViewStateService) { }

  ngOnInit(): void {
    this.vitalsEditMode = this.viewStateService.getVitalsEditMode();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.SetEvitalsEditMode(false);
  }

  public SetEvitalsEditMode(val: boolean) {
    return this.viewStateService.setVitalsEditMode(val);
  }

}
