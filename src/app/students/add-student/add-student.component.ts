import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IStudent, Student } from 'src/app/models/students';
import { User } from 'src/app/models/user';
import { StudentService } from 'src/app/services/student.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnChanges {

  @Input() authUser!: User;

  public studentForm: FormGroup;

  public error: string = '';
  public info: string = '';

  private _student!: Student | undefined;

  constructor(private studentService: StudentService, private formBuilder: FormBuilder) {

    this.studentForm = formBuilder.group({
      'Form_firstName': [
        { value: '', disabled: false },
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.pattern('^[a-zA-Zа]+$')
        ]],
      'Form_lastName': [
        { value: '', disabled: false },
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.pattern('^[a-zA-Zа]+$')
        ]],
      'Form_dateOfBirth': [
        { value: '', disabled: false },
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]{2}/[0-9]{2}/[0-9]{4}$')
        ]],
      'FormCheckbox_genderBoy': [{ value: false, disabled: false }],
      'FormCheckbox_genderGirl': [{ value: false, disabled: false }],
      'FormCheckbox_isToiletTrained': [{ value: false, disabled: false }],
      'FormCheckbox_isNonSleeper': [{ value: false, disabled: false }],
      'FormSelect_FullPartTime': [{ value: false, disabled: false }, [Validators.required]],

      'FormCheckbox_churchrd': [{ value: false, disabled: true }],
      'FormCheckbox_coneyboro': [{ value: false, disabled: true }],
      'FormCheckbox_glebelands': [{ value: false, disabled: true }],
    },
      {
        validators: [this.ValidateOfficeSelection.bind(this), this.ValidateGenderSelection.bind(this)],
        updateOn: 'change'
      });
  }

  ngOnChanges(): void {

    if (this.authUser) {
      this.authUser.Offices.forEach(office => {
        const officeFormControlName = 'FormCheckbox_' + office;
        this.studentForm.get(officeFormControlName)?.enable(); // can only add users to own offices
      });
    }
  }

  get FormFirstName(): string { return this.studentForm.get('Form_firstName')?.value };
  get FormLastName(): string { return this.studentForm.get('Form_lastName')?.value };
  get FormDateOfBirth(): string { return this.studentForm.get('Form_dateOfBirth')?.value };
  get FormGenderBoy(): boolean { return this.studentForm.get('FormCheckbox_genderBoy')?.value };
  get FormGenderGirl(): boolean { return this.studentForm.get('FormCheckbox_genderGirl')?.value };
  get FormIsToiletTrained(): boolean { return this.studentForm.get('FormCheckbox_isToiletTrained')?.value };
  get FormChurchrd(): boolean { return this.studentForm.get('FormCheckbox_churchrd')?.value };
  get FormConeyboro(): boolean { return this.studentForm.get('FormCheckbox_coneyboro')?.value };
  get FormGlebelands(): boolean { return this.studentForm.get('FormCheckbox_glebelands')?.value };

  get FormSelect_FullPartTime() { return this.studentForm.get('FormSelect_FullPartTime'); }

  public GetFormSelectFullPartTimeChange(e: any) {
    this.FormSelect_FullPartTime?.setValue(e.target.value, { onlySelf: true});
  }


  public async SubmitStudentForm(): Promise<void> {

    const selectedOffice = this.GetSelectedOffice();
    const selectedGender = this.GetSelectedGender();

    this._student = new Student(<IStudent>{
      FirstName: this.FormFirstName,
      LastName: this.FormLastName,
      CreatedDateTime: new Date(),
      IsArchived: true,
      Office: selectedOffice,
      DateOfBirth: this.FormDateOfBirth,
      IsToiletTrained: this.FormIsToiletTrained,
      Gender: selectedGender
    });

    if (await this.studentService.InsertStudentAsync(this._student)) {
      this.info = 'Student added successfully';
      this.ClearForm();
    }
  }

  public ClearForm(): void {
    this.studentForm.reset();
    this._student = undefined;
    this.error = '';
  }

  private GetSelectedGender(): string | undefined {

    if (this.FormGenderBoy) {
      return 'Boy';
    }

    if (this.FormGenderGirl) {
      return 'Girl';
    }

    return undefined;
  }

  private GetSelectedOffice(): string | undefined {

    if (this.FormChurchrd) {
      return 'churchrd';
    }

    if (this.FormConeyboro) {
      return 'coneyboro';
    }

    if (this.FormGlebelands) {
      return 'glebelands';
    }

    return undefined;
  }

  private ValidateOfficeSelection(formGroup: AbstractControl) {
    if (formGroup.get('FormCheckbox_churchrd')?.value == true) {
      return null;
    }
    if (formGroup.get('FormCheckbox_coneyboro')?.value == true) {
      return null;
    }
    if (formGroup.get('FormCheckbox_glebelands')?.value == true) {
      return null;
    }
    return { IsValid: false };
  }

  public ToggleGender(selected: string): void {

    if (selected == 'Boy') {
      this.studentForm.get('FormCheckbox_genderGirl')?.setValue(false);
    }

    if (selected == 'Girl') {
      this.studentForm.get('FormCheckbox_genderBoy')?.setValue(false);
    }
  }

  public ToggleOffices(selected: string): void {

    if (selected == 'churchrd') {
      this.studentForm.get('FormCheckbox_coneyboro')?.setValue(false);
      this.studentForm.get('FormCheckbox_glebelands')?.setValue(false);
    }

    if (selected == 'coneyboro') {
      this.studentForm.get('FormCheckbox_churchrd')?.setValue(false);
      this.studentForm.get('FormCheckbox_glebelands')?.setValue(false);
    }

    if (selected == 'glebelands') {
      this.studentForm.get('FormCheckbox_churchrd')?.setValue(false);
      this.studentForm.get('FormCheckbox_coneyboro')?.setValue(false);
    }
  }

  private ValidateGenderSelection(formGroup: AbstractControl) {
    if (formGroup.get('FormCheckbox_genderBoy')?.value == true) {
      return null;
    }
    if (formGroup.get('FormCheckbox_genderGirl')?.value == true) {
      return null;
    }

    return { IsValid: false };
  }

}
