import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ListFilter } from 'src/app/models/filters';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.scss']
})
export class ListFilterComponent implements OnInit {

  @Input() authUser!: User;
  @Output() filterChanged = new EventEmitter<ListFilter>();

  public form: FormGroup;

  private filter!: ListFilter;

  constructor(private formBuilder: FormBuilder) {

    this.form = formBuilder.group({
      'FormCheckbox_churchrd': [{ value: false, disabled: true }],
      'FormCheckbox_coneyboro': [{ value: false, disabled: true }],
      'FormCheckbox_glebelands': [{ value: false, disabled: true }],
      'FormCheckbox_admin': [{ value: false, disabled: false }],
      'FormCheckbox_archived': [{ value: false, disabled: false }]
    },
      {
        validators: this.ValidateOfficeSelection.bind(this),
        updateOn: 'change'
      });

    this.filter = {
      offices: [],
      includeAdmin: false,
      includeArchived: false,
    }

  }

  get FormCheckbox_churchrd(): boolean | undefined { return this.form.get('FormCheckbox_churchrd')?.value }
  get FormCheckbox_coneyboro(): boolean | undefined { return this.form.get('FormCheckbox_coneyboro')?.value }
  get FormCheckbox_glebelands(): boolean | undefined { return this.form.get('FormCheckbox_glebelands')?.value }
  get FormCheckbox_admin(): boolean | undefined { return this.form.get('FormCheckbox_admin')?.value }
  get FormCheckbox_archived(): boolean | undefined { return this.form.get('FormCheckbox_archived')?.value }

  ngOnInit(): void {

    this.filter.offices = this.authUser.Offices;

    this.authUser.Offices.forEach(office => {
      const officeFormControlName = 'FormCheckbox_' + office;
      this.form.get(officeFormControlName)?.setValue(true);
      this.form.get(officeFormControlName)?.enable();
    });

    if (!this.authUser.Permissions.Admin) {
      this.form.get('FormCheckbox_admin')?.disable();
      this.form.get('FormCheckbox_archived')?.disable();
    }

    this.filterChanged.emit(this.filter);

  }

  public SubmitFilterForm(): void {

    this.filter.offices = [];

    if (this.FormCheckbox_churchrd) {
      this.filter.offices.push('churchrd');
    }

    if (this.FormCheckbox_coneyboro) {
      this.filter.offices.push('coneyboro');
    }

    if (this.FormCheckbox_glebelands) {
      this.filter.offices.push('glebelands');
    }

    this.filter.includeAdmin = this.FormCheckbox_admin ?? false;
    this.filter.includeArchived = this.FormCheckbox_archived ?? false;

    this.filterChanged.emit(this.filter);
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
    return { officesSelected: false };
  }

}
