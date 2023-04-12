import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Room } from 'src/app/models/room';
import { User } from 'src/app/models/user';
import { RoomService } from 'src/app/services/room.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rooms-base',
  templateUrl: './rooms-base.component.html',
  styleUrls: ['./rooms-base.component.scss']
})
export class RoomsBaseComponent implements OnInit {

  public authUser$!: Observable<User | null>;
  public rooms$!: Observable<Room[]>;
  public searchTerm!: string;
  public filterForm: FormGroup;

  private filterOffices: string[];

  constructor(private userService: UserService, private roomService: RoomService, private formBuilder: FormBuilder) {

    this.authUser$ = this.userService.LoggedInUser;

    this.filterForm = this.formBuilder.group({
      'FormCheckbox_churchrd': [{ value: false, disabled: true }],
      'FormCheckbox_coneyboro': [{ value: false, disabled: true }],
      'FormCheckbox_glebelands': [{ value: false, disabled: true }]
    },
      {
        validators: this.ValidateOfficeSelection.bind(this),
        updateOn: 'change'
      });

    this.filterOffices = [];
  }

  get FormCheckbox_churchrd(): boolean | undefined { return this.filterForm.get('FormCheckbox_churchrd')?.value }
  get FormCheckbox_coneyboro(): boolean | undefined { return this.filterForm.get('FormCheckbox_coneyboro')?.value }
  get FormCheckbox_glebelands(): boolean | undefined { return this.filterForm.get('FormCheckbox_glebelands')?.value }

  ngOnInit(): void {

    this.userService.LoggedInUser.pipe(take(1)).subscribe(user => {
      if (user) {

        this.filterOffices = user.Offices;

        user.Offices.forEach(office => {
          const officeFormControlName = 'FormCheckbox_' + office;
          this.filterForm.get(officeFormControlName)?.setValue(true);
          this.filterForm.get(officeFormControlName)?.enable();
        });

        this.FetchRooms();
      }
    });
  }

  public FetchRooms() {
    this.rooms$ = this.roomService.GetRoomsAsync(this.filterOffices);
  }

  public SubmitFilterForm(): void {

    this.filterOffices = [];

    if (this.FormCheckbox_churchrd) { this.filterOffices.push('churchrd'); }
    if (this.FormCheckbox_coneyboro) { this.filterOffices.push('coneyboro'); }
    if (this.FormCheckbox_glebelands) { this.filterOffices.push('glebelands'); }

    this.FetchRooms();
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
