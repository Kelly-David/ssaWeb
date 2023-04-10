import { Base } from './base';

export class Child implements Base, IChild {

  public Id: string;

  public FirstName: string;

  public LastName: string;

  public CreatedDateTime: Date;

  public UpdatedDateTime?: Date;

  public IsArchived: boolean = false;

  public Office: string;

  public Room?: string;

  constructor(child: IChild) {
    this.Id = child.Id ?? undefined;
    this.FirstName = child.FirstName  ?? undefined;
    this.LastName = child.LastName  ?? undefined;
    this.Office = child.Office ?? undefined;
    this.CreatedDateTime = child.CreatedDateTime ?? undefined;
    this.UpdatedDateTime = child.UpdatedDateTime ?? undefined;
    this.IsArchived = child.IsArchived ?? undefined;
    this.Room = child.Room ?? undefined;
  }
}

export interface IChild {

  Id: string;
  FirstName: string;
  LastName: string;
  CreatedDateTime: Date;
  UpdatedDateTime?: Date;
  IsArchived: boolean;
  Office: string;
  Room?: string;
}

export class Day {

  public Id: string;

  public Status: DayStatus

  public StartDateTime: Date;
  public StartDateTimeAuditUserId: string;
  public StartDateTimeAuditUserName?: string;

  public EndDateTime?: Date;
  public EndDateTimeAuditUserId?: string;
  public EndDateTimeAuditUserName?: string;

  public Meals?: MealEvent[];
  public Naps?: SleepEvent[];
  public NappyChanges?: NappyChangeEvent[];
  public Activities?: ActivityEvent[];

  public Notes?: string;

  constructor(id: string, createdBy: string, status?: DayStatus,) {
    this.Id = id;
    this.Status = status ?? DayStatus.Open,
      this.StartDateTime = new Date();
    this.StartDateTimeAuditUserId = createdBy;
  }
}

export enum DayStatus {
  Open = "Open",
  Complete = "Complete",
  Unknown = "Unknown"
}

export class BaseEvent {
  public Id: string;

  public Type: EventType;

  public StartDateTime: Date;

  public EndDateTime?: Date;

  public CreatedDateTime: Date;

  public UpdatedDateTime?: Date;

  public AuditUserId: string;

  public AuditUserName?: string;

  constructor(id: string, type: EventType, startDateTime: Date, auditUserId: string) {
    this.Id = id;
    this.Type = type;
    this.StartDateTime = startDateTime;
    this.CreatedDateTime = new Date;
    this.AuditUserId = auditUserId;
  }
}

export enum EventType {
  Activity = "Activity",
  Sleep = "Sleep",
  Meal = "Meal",
  NappyChange = "Nappy Change",
  Unknown = "Unknown"
}

export class MealEvent extends BaseEvent {
  public MealType: MealType;
  public Desciption: string;
  public AmountEaten: string;

  constructor(id: string, type: EventType, startDateTime: Date, auditUserId: string, meal: MealType, description: string, amountEaten: string) {
    super(id, type, startDateTime, auditUserId)

    this.MealType = meal;
    this.AmountEaten = amountEaten;
    this.Desciption = description;
  }
}

export class NappyChangeEvent extends BaseEvent {
  public NappyChangeType: NappyChangeType;
  public Note?: string;

  constructor(id: string, type: EventType, startDateTime: Date, auditUserId: string, nappyChangeType: NappyChangeType, note?: string) {
    super(id, type, startDateTime, auditUserId)

    this.NappyChangeType = nappyChangeType;
    this.Note = note;
  }
}

export class SleepEvent extends BaseEvent {
  public SleepDateTime?: Date;
  public LinenChange?: LinenChange;
  public SleepCheck?: SleepCheck[];

  constructor(id: string, type: EventType, startDateTime: Date, auditUserId: string, sleepDatTime?: Date) {
    super(id, type, startDateTime, auditUserId)

    this.SleepDateTime = sleepDatTime;
  }
}

export class SleepCheck {
  public CreatedDateTime: Date;
  public BreathingNormal: boolean;
  public Position: SleepPosition;
  public PalourNormal: boolean;

  constructor(createdDateTime: Date, breathing: boolean, palour: boolean, position: SleepPosition) {
    this.CreatedDateTime = createdDateTime;
    this.BreathingNormal = breathing;
    this.PalourNormal = palour;
    this.Position = position;
  }
}

export class LinenChange {
  public RegularChange: boolean;
  public Soiled: boolean;
  public Note?: string;

  constructor(regularChange: boolean, soiled: boolean, note?: string) {
    this.RegularChange = regularChange;
    this.Soiled = soiled;
    this.Note = note;
  }
}

export class ActivityEvent extends BaseEvent {
  public ImageUrl: string;
  public Desciption: string;

  constructor(id: string, type: EventType, startDateTime: Date, auditUserId: string, imageUrl: string, description: string) {
    super(id, type, startDateTime, auditUserId)

    this.ImageUrl = imageUrl;
    this.Desciption = description;
  }
}

export enum MealType {
  Snack = "Snack",
  Dinner = "Dinner",
  Lunch = "Lunch",
  Breaksfast = "Breaksfast",
  Unknown = "Unknown"
}

export enum SleepPosition {
  LeftSide = "Right Side",
  RightSide = "Left Side",
  Back = "Back",
  Front = "Front",
  Unknown = "Unknown"
}

export enum NappyChangeType {
  Dry = "Dry",
  Wet = "Wet",
  Soiled = "Soiled",
  Unknown = "Unknown"
}
