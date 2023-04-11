import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
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

  constructor(private userService: UserService, private studentService: StudentService) {
    this.authUser$ = this.userService.LoggedInUser;
   }

  ngOnInit(): void {

    this.userService.LoggedInUser.pipe(take(1)).subscribe(user => {
      if (user) {

        this.FetchStudents(user.Offices);
      }
    });

  }

  private FetchStudents(offices: string[]) {

    this.students$ = this.studentService.GetStudentsAsync(offices);

  }

}
