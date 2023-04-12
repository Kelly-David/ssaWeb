import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { StudentFilter } from 'src/app/models/filters';
import { Student } from 'src/app/models/students';
import { StudentService } from 'src/app/services/student.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-students-base',
  templateUrl: './students-base.component.html',
  styleUrls: ['./students-base.component.scss']
})
export class StudentsBaseComponent implements OnInit {

  public authUser$: Observable<any>;
  public students$!: Observable<Student[]>;
  public searchTerm!: string;
  public filterForm: FormGroup;

  private filter!: StudentFilter;

  constructor(private userService: UserService, private studentService: StudentService, private formBuilder: FormBuilder) {

    this.authUser$ = this.userService.LoggedInUser;

    this.filterForm = formBuilder.group({
      'FormCheckbox_churchrd': [{ value: false, disabled: true }],
      'FormCheckbox_coneyboro': [{ value: false, disabled: true }],
      'FormCheckbox_glebelands': [{ value: false, disabled: true }],
      'FormCheckbox_archived': [{ value: false, disabled: false }]
    },
    {
      validators: this.ValidateOfficeSelection.bind(this),
      updateOn: 'change'
    });

    this.filter = {
      offices: [],
      rooms: [],
      includeArchived: false
    };
  }

  get FormCheckbox_churchrd(): boolean | undefined { return this.filterForm.get('FormCheckbox_churchrd')?.value }
  get FormCheckbox_coneyboro(): boolean | undefined { return this.filterForm.get('FormCheckbox_coneyboro')?.value }
  get FormCheckbox_glebelands(): boolean | undefined { return this.filterForm.get('FormCheckbox_glebelands')?.value }
  get FormCheckbox_archived(): boolean | undefined { return this.filterForm.get('FormCheckbox_archived')?.value }

  ngOnInit(): void {

    this.userService.LoggedInUser.pipe(take(1)).subscribe(user => {
      if (user) {

        this.filter.offices = user.Offices;

        user.Offices.forEach(office => {
          const officeFormControlName = 'FormCheckbox_' + office;
          this.filterForm.get(officeFormControlName)?.setValue(true);
          this.filterForm.get(officeFormControlName)?.enable();
        });

        if (!user.Permissions.Admin) {
          this.filterForm.get('FormCheckbox_archived')?.disable();
        }

        this.FetchStudents();
      }
    });
  }

  public SubmitFilterForm(): void {

    this.filter.offices = [];

    if (this.FormCheckbox_churchrd) {
      this.filter.offices.push('churchrd');
    }

    if (this.FormCheckbox_coneyboro) {
      this.filter.offices.push('coneyboro');
    }

    if (this.FormCheckbox_glebelands) {
      this.filter.offices.push('glebelands');
    }

    this.filter.includeArchived = this.FormCheckbox_archived ?? false;

    this.FetchStudents();
  }

  private FetchStudents() {
    this.students$ = this.studentService.GetStudentsAsync(this.filter.offices, this.filter.includeArchived);
  }

  private ValidateOfficeSelection(formGroup: AbstractControl) {
    if (formGroup.get('FormCheckbox_churchrd')?.value == true) {
      return null;
    }
    if (formGroup.get('FormCheckbox_coneyboro')?.value == true) {
      return null;
    }
    if (formGroup.get('FormCheckbox_glebelands')?.value == true) {
      return null;
    }
    return { officesSelected: false };
  }

}
