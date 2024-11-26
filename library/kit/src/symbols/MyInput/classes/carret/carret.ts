import { Field } from '../field/field.ts';

import s from './default.module.scss';

export class Carret {
  private _parent: Field;
  private _element: HTMLDivElement;
  private _x: number = 0;
  private _y: number = 0;

  constructor(parent: Field) {
    this._parent = parent;

    this._createElement();
    this._mount();
  }

  private _createElement() {
    this._element = document.createElement('div');

    this._element.classList.add(s.carret);
  }

  private _mount() {
    const parentElement = this._parent.getElement();

    parentElement.appendChild(this._element);
  }

  update() {
    this._element.style.top = this._parent.getCurrentLine().getRect().y + 'px';
    this._element.style.height = this._parent.getCurrentLine().getRect().height + 'px';

    const currentChar = this._parent.getCurrentLine().getChar(this._x - 1);
    if (currentChar) {
      this._element.style.left = currentChar.getRect().x + currentChar.getRect().width + 'px';
    } else {
      this._element.style.left = this._parent.getCurrentLine().getRect().x + 'px';
    }
  }

  getPos() {
    return { x: this._x, y: this._y };
  }

  setPos(x: number, y: number) {
    this._x = x;
    this._y = y;

    this.update();
  }

  setPosX(x: number) {
    this._x = x;
    this.update();
  }

  setPosY(y: number) {
    this._y = y;
    this.update();
  }

  visible(state: boolean) {
    this._element.style.display = state ? 'block' : 'none';
    this.update();
  }
}
