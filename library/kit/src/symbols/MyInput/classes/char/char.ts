import { Line } from '../line/line.ts';

import s from './default.module.scss';

export class Char {
  private _parent: Line;
  private _nextChar: Char | 'start' | 'end';
  private _element: HTMLDivElement;

  constructor(parent: Line, nextChar: Char | 'start' | 'end') {
    this._parent = parent;
    this._nextChar = nextChar;

    this._createElement();
    this._mount();
  }

  private _createElement() {
    this._element = document.createElement('div');

    this._element.classList.add(s.char);
  }

  private _mount() {
    const currentLine = this._parent.getElement();

    if (currentLine) {
      if (this._nextChar instanceof Char) {
        this._nextChar.getElement().insertAdjacentElement('afterend', this._element);
      } else if (this._nextChar === 'start') {
        currentLine.prepend(this._element);
      } else {
        currentLine.appendChild(this._element);
      }
    }
  }

  getElement() {
    return this._element;
  }

  getRect() {
    const rect = this._element.getBoundingClientRect();
    const parentRect = this._parent.getParent().getRect();

    return {
      x: rect.x - parentRect.x,
      y: rect.y - parentRect.y,
      height: rect.height,
      width: rect.width,
    };
  }

  setValue(value: string) {
    if (value === ' ') {
      value = `&nbsp;`;
    }
    this._element.innerHTML = value;
  }

  remove() {
    const currentLine = this._parent.getElement();

    if (currentLine) {
      currentLine.removeChild(this._element);
    }
  }
}
