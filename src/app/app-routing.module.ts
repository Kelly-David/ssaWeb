import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ResetComponent } from './auth/reset/reset.component';
import { DailyFormComponent } from './daily-form/daily-form/daily-form.component';
import { UserBaseComponent } from './users/user-base/user-base.component';
import { StudentsBaseComponent } from './students/students-base/students-base.component';
import { RoomsBaseComponent } from './rooms/rooms-base/rooms-base.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'reset', component: ResetComponent },
  {
    path: 'auth', canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'daily-form', component: DailyFormComponent },
      { path: 'staff', component: UserBaseComponent },
      { path: 'students', component: StudentsBaseComponent },
      { path: 'rooms', component: RoomsBaseComponent }


    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
