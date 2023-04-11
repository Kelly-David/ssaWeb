import { Component, Input, OnInit } from '@angular/core';
import { Student } from 'src/app/models/students';

@Component({
  selector: 'app-student-item',
  templateUrl: './student-item.component.html',
  styleUrls: ['./student-item.component.scss']
})
export class StudentItemComponent implements OnInit {

  @Input() student!: Student

  constructor() { }

  ngOnInit(): void {
  }

}
