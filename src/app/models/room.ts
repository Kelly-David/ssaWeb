
export class Room implements Room {
  public Id: string;
  public Name: string;
  public Students: string[];
  public MaxCapacity: number;
  public Office: string;
  public IsArchived: boolean;
  public CreatedDateTime: any;
  public ArchivedDateTime?: any;
  public UpdatedDateTime?: any;

  constructor(object: IRoom) {
    this.Id = object.Id ?? '';
    this.Name = object.Name;
    this.Students = object.Students;
    this.MaxCapacity = object.MaxCapacity;
    this.Office = object.Office;
    this.IsArchived = object.IsArchived;
    this.CreatedDateTime = object.CreatedDateTime;
    this.ArchivedDateTime = object.ArchivedDateTime;
    this.UpdatedDateTime = object.UpdatedDateTime;
  }

  get IsOverCapacity(): boolean {
    return this.Students.length >= this.MaxCapacity;
  }

  get ToPlainObj(): object {
    let obj = this as any;
    Object.keys(obj).forEach(key => obj[key] === undefined ? delete obj[key] : {});
    return Object.assign({}, obj);
  }
}

export interface IRoom {
  Id: string;
  Name: string;
  Students: string[];
  MaxCapacity: number;
  Office: string;
  IsArchived: boolean;
  CreatedDateTime: any;
  ArchivedDateTime?: any;
  UpdatedDateTime?: any;
}
