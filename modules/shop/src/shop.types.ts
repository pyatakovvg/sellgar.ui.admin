export interface ICompany {
  uuid: string | null;
  name?: string;
}

export interface IShop {
  uuid: string | null;
  name: string;
  address: string;
  company: ICompany;
}
