import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { StudentItemComponent } from './student-item/student-item.component';
import { StudentsBaseComponent } from './students-base/students-base.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';

@NgModule({
  declarations: [
    StudentItemComponent,
    StudentsBaseComponent,
    AddStudentComponent,
    EditStudentComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class StudentsModule { }
