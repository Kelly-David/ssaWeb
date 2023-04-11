import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { StudentItemComponent } from './student-item/student-item.component';
import { StudentsComponent } from './students/students.component';
import { StudentsBaseComponent } from './students-base/students-base.component';

@NgModule({
  declarations: [
    StudentItemComponent,
    StudentsComponent,
    StudentsBaseComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class StudentsModule { }
