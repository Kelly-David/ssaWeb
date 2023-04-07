
export interface GlobalConfiguration {

  Environment: string;
  Offices?: Office[] | undefined;

}

export interface Office {
    Id: string;
    Name: string;
    Address: string;
}
