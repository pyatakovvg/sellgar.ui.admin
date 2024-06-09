import { makeAutoObservable, observable, action } from 'mobx';

class Dialog {
  @observable uuid: string;
  @observable name: string;
  @observable isOpen: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  @action.bound
  show() {
    this.isOpen = true;
  }

  @action.bound
  hide() {
    this.isOpen = false;
  }
}

export class DialogStore {
  @observable instances: Dialog[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  private _getByName(name: string) {
    return this.instances.find((dialog) => dialog.name === name) ?? null;
  }

  @action.bound
  show(name: string) {
    const dialog = this._getByName(name);
    if (dialog) {
      dialog.show();
    }
  }

  @action.bound
  hide(name: string) {
    const dialog = this._getByName(name);
    if (dialog) {
      dialog.hide();
    }
  }

  add(name: string) {
    const dialog = new Dialog();

    dialog.uuid = Date.now().toString();
    dialog.name = name;

    this.instances = [...this.instances, dialog];
  }
}
