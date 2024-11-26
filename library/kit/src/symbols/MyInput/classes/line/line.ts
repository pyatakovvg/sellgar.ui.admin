import { Char } from '../char/char.ts';
import { Field } from '../field/field.ts';

import s from './default.module.scss';

export class Line {
  private _parent: Field;
  private _element: HTMLDivElement;
  private _chars: Char[] = [];

  constructor(parent: Field) {
    this._parent = parent;

    this._createElement();
    this._mount();
  }

  private _createElement() {
    this._element = document.createElement('div');

    this._element.classList.add(s.line);
  }

  private _mount() {
    const parentElement = this._parent.getElement();

    parentElement.appendChild(this._element);
  }

  getChar(index: number) {
    return this._chars[index];
  }

  getParent() {
    return this._parent;
  }

  getRect() {
    const rect = this._element.getBoundingClientRect();
    const parentRect = this._parent.getRect();

    return {
      x: rect.x - parentRect.x,
      y: rect.y - parentRect.y,
      height: rect.height,
      width: rect.width,
    };
  }

  getCharsLength() {
    return this._chars.length;
  }

  getElement() {
    return this._element;
  }

  addChar(charValue: string, charIndex: number) {
    let nextChar: Char | 'start' | 'end';
    if (charIndex < this._chars.length && charIndex > 0) {
      nextChar = this._chars[charIndex - 1];
    } else if (charIndex === 0) {
      nextChar = 'start';
    } else {
      nextChar = 'end';
    }
    const char = new Char(this, nextChar);

    char.setValue(charValue);

    this._chars = [...this._chars.slice(0, charIndex), char, ...this._chars.slice(charIndex)];
  }

  removeChar(index: number) {
    const char = this._chars[index];

    if (char) {
      char.remove();

      this._chars = [...this._chars.slice(0, index), ...this._chars.slice(index + 1)];
    }
  }

  remove() {
    const parentElement = this._parent.getElement();

    if (parentElement) {
      parentElement.removeChild(this._element);
    }
  }
}
