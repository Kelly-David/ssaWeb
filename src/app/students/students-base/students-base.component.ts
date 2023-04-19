import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ListFilter, StudentFilter } from 'src/app/models/filters';
import { Student } from 'src/app/models/students';
import { PageType } from 'src/app/models/web';
import { StudentService } from 'src/app/services/student.service';
import { UserService } from 'src/app/services/user.service';
import { ViewStateService } from 'src/app/services/view-state.service';

@Component({
  selector: 'app-students-base',
  templateUrl: './students-base.component.html',
  styleUrls: ['./students-base.component.scss']
})
export class StudentsBaseComponent implements OnInit {

  public authUser$: Observable<any>;
  public students!: Observable<Student[] | null>;
  public searchTerm!: string;
  public sidebarState!: Observable<boolean>;
  public selectedStudent: Student | undefined;
  public PageType = PageType.User;

  private filter!: ListFilter;

  constructor(private userService: UserService, private studentService: StudentService, private viewStateService: ViewStateService) {
    this.authUser$ = this.userService.LoggedInUser;
  }

  ngOnInit(): void {
    this.sidebarState = this.viewStateService.getSidebarState();
  }

  private FetchStudents(filter: ListFilter) {
    this.students = this.studentService.GetStudentsAsync(filter.offices, filter.includeArchived);
  }

  public GetSelectedStudent($event: any): void {
    this.selectedStudent = $event;
  }

  public SearchTermChanged($event: any): void {
    this.searchTerm = $event;
  }

  public ReceiveFilters($event: any):void {
    this.FetchStudents($event as ListFilter);
  }

}
