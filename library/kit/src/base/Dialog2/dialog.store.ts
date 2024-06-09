import { makeAutoObservable, observable, action } from 'mobx';

class Dialog {
  @observable name: string;

  constructor(name: string) {
    this.name = name;

    makeAutoObservable(this);
  }
}

class DialogStore {
  @observable isOpen: boolean = false;
  @observable dialogs: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action.bound
  addDialog(name: string) {
    this.dialogs = [...this.dialogs, name];
    this.checkSomeOpenDialog();
  }

  @action.bound
  removeDialog(currentName: string) {
    this.dialogs = this.dialogs.filter((name) => name !== currentName);
    this.checkSomeOpenDialog();
  }

  @action.bound
  checkSomeOpenDialog() {
    this.isOpen = !!this.dialogs.length;
  }
}

export const dialogStore = new DialogStore();
