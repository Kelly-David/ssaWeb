import { Component, Input, OnInit } from '@angular/core';
import { Student } from 'src/app/models/students';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  @Input() studentList!: Student[];

  constructor() { }

  ngOnInit(): void {
  }

}
