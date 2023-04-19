import { Component, Input, OnInit } from '@angular/core';
import { Student } from 'src/app/models/students';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-student-item',
  templateUrl: './student-item.component.html',
  styleUrls: ['./student-item.component.scss']
})
export class StudentItemComponent implements OnInit {

  @Input() authUser!: User;
  @Input() student!: Student

  constructor() { }

  ngOnInit(): void {
  }

}
