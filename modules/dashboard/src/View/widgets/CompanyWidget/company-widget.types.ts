export interface IShop {
  uuid: string;
  name: string;
  isActive: boolean;
}

export interface ICompany {
  uuid: string;
  name: string;
  shops: IShop[];
}
