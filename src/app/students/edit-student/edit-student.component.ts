import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/models/students';
import { User } from 'src/app/models/user';
import { StudentService } from 'src/app/services/student.service';
import { ViewStateService } from '../../services/view-state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {

  @Input() authUser!: User;
  @Input() student!: Student;

  public studentForm: FormGroup;
  public vitalsEditMode!: Observable<boolean>;

  constructor(private studentService: StudentService, private formBuilder: FormBuilder, private viewStateService: ViewStateService) {

    this.studentForm = formBuilder.group({
      'Form_FirstName' : [{value: '', disabled: false}, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Zа]+$')
      ]],
      'Form_LastName' : [{value: '', disabled: false}, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Zа]+$')
      ]],
      'Form_DateOfBirth' : [{value: '', disabled: false}, [
        Validators.required
      ]],
      'Form_Gender_Boy': [{value: '', disabled: false}],
      'Form_Gender_Grl': [{value: '', disabled: false}],
      'Form_IsToiletTrained' : [{value: '', disabled: false}],
      'Form_IsNonSleeper' : [{value: '', disabled: false}],
      'Form_IsPartTime' : [{value: '', disabled: false}],
      'Form_Office_ChurchRd' : [{value: '', disabled: false}],
      'Form_Office_Coneyboro' : [{value: '', disabled: false}],
      'Form_Office_Glebelands' : [{value: '', disabled: false}]
    },
    {
      validators: [this.ValidateOfficeSelection.bind(this), this.ValidateGenderSelection.bind(this)],
      updateOn: 'change'
    });
   }

  ngOnInit(): void {

    this.vitalsEditMode  =this.viewStateService.getVitalsEditMode();

    if (this.student != undefined) {

      this.studentForm.patchValue({
        Form_FirstName: this.student.FirstName,
        Form_LastName: this.student.LastName,
        Form_DateOfBirth: this.student.DateOfBirth,
        Form_Gender_Boy: this.student.Gender == 'Boy',
        Form_Gender_Grl: this.student.Gender == 'Girl',
        Form_IsToiletTrained: this.student.IsToiletTrained,
        Form_IsNonSleeper: this.student.IsNonSleeper,
        Form_IsPartTime: this.student.IsPartTime,
        Form_Office_ChurchRd: this.student.Office.toLowerCase() == 'churchrd',
        Form_Office_Coneyboro: this.student.Office.toLowerCase() == 'coneyboro',
        Form_Office_Glebelands: this.student.Office.toLowerCase() == 'glebelands'
      })
    }
  }

  private ValidateOfficeSelection(formGroup: AbstractControl) {
    if (formGroup.get('Form_Office_ChurchRd')?.value == true) {
      return null;
    }
    if (formGroup.get('Form_Office_Coneyboro')?.value == true) {
      return null;
    }
    if (formGroup.get('Form_Office_Glebelands')?.value == true) {
      return null;
    }
    return { IsValid: false };
  }

  private ValidateGenderSelection(formGroup: AbstractControl) {
    if (formGroup.get('Form_Gender_Boy')?.value == true) {
      return null;
    }
    if (formGroup.get('Form_Gender_Grl')?.value == true) {
      return null;
    }
    return { IsValid: false };
  }

  public ToggleGender(selected: string): void {
    if (selected == 'boy') {
      this.studentForm.get('Form_Gender_Grl')?.setValue(false);
    }
    if (selected == 'girl') {
      this.studentForm.get('Form_Gender_Boy')?.setValue(false);
    }
  }

  public ToggleOffices(selected: string): void {

    if (selected == 'churchrd') {
      this.studentForm.get('Form_Office_Coneyboro')?.setValue(false);
      this.studentForm.get('Form_Office_Glebelands')?.setValue(false);
    }
    if (selected == 'coneyboro') {
      this.studentForm.get('Form_Office_ChurchRd')?.setValue(false);
      this.studentForm.get('Form_Office_Glebelands')?.setValue(false);
    }
    if (selected == 'glebelands') {
      this.studentForm.get('Form_Office_ChurchRd')?.setValue(false);
      this.studentForm.get('Form_Office_Coneyboro')?.setValue(false);
    }
  }

  public SetEvitalsEditMode(val: boolean) {
    return this.viewStateService.setVitalsEditMode(val);
  }

  public SubmitStudentForm() {

  }

}
