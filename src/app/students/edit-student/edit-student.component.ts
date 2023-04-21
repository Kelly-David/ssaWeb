import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IStudent, Student } from 'src/app/models/students';
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
  public info: string = "";

  constructor(private studentService: StudentService, private formBuilder: FormBuilder, private viewStateService: ViewStateService) {

    this.studentForm = formBuilder.group({
      'Form_FirstName': [{ value: '', disabled: false }, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Zа]+$')
      ]],
      'Form_LastName': [{ value: '', disabled: false }, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Zа]+$')
      ]],
      'Form_DateOfBirth': [{ value: '', disabled: false }, [
        Validators.required
      ]],
      'Form_Gender_Boy': [{ value: '', disabled: false }],
      'Form_Gender_Grl': [{ value: '', disabled: false }],
      'Form_IsToiletTrained': [{ value: '', disabled: false }],
      'Form_IsNonSleeper': [{ value: '', disabled: false }],
      'Form_IsPartTime': [{ value: '', disabled: false }],
      'Form_Office_ChurchRd': [{ value: '', disabled: false }],
      'Form_Office_Coneyboro': [{ value: '', disabled: false }],
      'Form_Office_Glebelands': [{ value: '', disabled: false }]
    },
      {
        validators: [this.ValidateOfficeSelection.bind(this), this.ValidateGenderSelection.bind(this)],
        updateOn: 'change'
      });
  }

  ngOnInit(): void {

    this.vitalsEditMode = this.viewStateService.getVitalsEditMode();

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


  /// Public methods ----------------------------------------------------------------

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

  public async SubmitStudentForm() {

    const selectedOffice = this.GetSelectedOffice();
    const selectedGender = this.GetSelectedGender();

    var updates = {
      FirstName: this.Form_FirstName,
      LastName: this.Form_LastName,
      DateOfBirth: this.Form_DateOfBirth,
      Office: selectedOffice,
      IsToiletTrained: this.Form_IsToiletTrained,
      Gender: selectedGender,
      IsNonSleeper: this.Form_IsNonSleeper,
      IsPartTime: this.Form_IsPartTime,
      UpdatedDateTime: new Date()
    } as IStudent;

    if (await this.studentService.UpdateStudentAsync(this.student.Id, updates)) {
      this.info = 'Student successfully updated;';
      this.viewStateService.setVitalsEditMode(false);
    }
  }


  /// Form getters -------------------------------------------------------------------

  get Form_FirstName(): string { return this.studentForm.get('Form_FirstName')?.value; }
  get Form_LastName(): string { return this.studentForm.get('Form_LastName')?.value; }
  get Form_DateOfBirth(): string { return this.studentForm.get('Form_DateOfBirth')?.value; }
  get Form_Gender_Boy(): boolean { return this.studentForm.get('Form_Gender_Boy')?.value; }
  get Form_Gender_Grl(): boolean { return this.studentForm.get('Form_Gender_Grl')?.value; }
  get Form_IsToiletTrained(): boolean { return this.studentForm.get('Form_IsToiletTrained')?.value; }
  get Form_IsNonSleeper(): boolean { return this.studentForm.get('Form_IsNonSleeper')?.value; }
  get Form_IsPartTime(): boolean { return this.studentForm.get('Form_IsPartTime')?.value; }
  get Form_Office_ChurchRd(): boolean { return this.studentForm.get('Form_Office_ChurchRd')?.value; }
  get Form_Office_Coneyboro(): boolean { return this.studentForm.get('Form_Office_Coneyboro')?.value; }
  get Form_Office_Glebelands(): boolean { return this.studentForm.get('Form_Office_Glebelands')?.value; }

  /// Private Methods ----------------------------------------------------------------

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

  private GetSelectedGender(): string | undefined {
    if (this.Form_Gender_Boy) { return 'Boy'; }
    if (this.Form_Gender_Grl) { return 'Girl'; }
    return undefined;
  }

  private GetSelectedOffice(): string | undefined {
    if (this.Form_Office_ChurchRd) { return 'churchrd'; }
    if (this.Form_Office_Coneyboro) { return 'coneyboro'; }
    if (this.Form_Office_Glebelands) { return 'glebelands'; }
    return undefined;
  }

}
