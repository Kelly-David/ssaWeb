import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';
import { AttendanceService } from 'src/app/services/attendance.service';
import { Attendance } from 'src/app/models/attendance';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public user!: Observable<User | null>;

  public attendance$!: Promise<Attendance>;
  public today = new Date().toLocaleDateString();

  constructor(private userService: UserService, private attendanceService: AttendanceService) { }

  ngOnInit() {

    this.user = this.userService.LoggedInUser;

    this.attendance$ = this.attendanceService.GetAttendance();
  }

}
