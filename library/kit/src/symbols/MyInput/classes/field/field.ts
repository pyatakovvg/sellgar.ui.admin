import { Line } from '../line/line.ts';
import { Carret } from '../carret/carret.ts';

import s from './default.module.scss';

interface IFieldOptions {
  selector: HTMLDivElement;
  text?: string;
  autoFocus?: boolean;
}

export class Field {
  private _element: HTMLDivElement;
  private _lines: Line[] = [];
  private _carret: Carret;

  constructor(private readonly options?: IFieldOptions) {
    this._createElement();
    this._mount();

    this._createCarret();
    this.addLine();
    this.createText();

    this._addEventKeyboard();

    if (this.options?.autoFocus) {
      this._setFocus();
    }
  }

  private _createElement() {
    this._element = document.createElement('div');

    this._element.classList.add(s.field);
    this._element.setAttribute('tabindex', '0');
  }

  private _setFocus() {
    this._element.addEventListener('focus', () => {
      this._element.classList.add(s.focus);
      this._carret.visible(true);
    });
    this._element.addEventListener('blur', () => {
      this._element.classList.remove(s.focus);
      this._carret.visible(false);
    });
    this._element.focus();
  }

  private _mount() {
    this.options?.selector.appendChild(this._element);
  }

  private _createCarret() {
    this._carret = new Carret(this);
  }

  private _addEventKeyboard() {
    this._element.addEventListener('keydown', (e: KeyboardEvent) => {
      e.stopPropagation();

      if (e.key === 'Backspace') {
        this.removeCharByBackspace();
      }
      if (e.key === 'ArrowLeft') {
        if (this._carret.getPos().x - 1 >= 0) {
          this._carret.setPosX(this._carret.getPos().x - 1);
        }
      }
      if (e.key === 'ArrowRight') {
        if (this._carret.getPos().x + 1 <= this.getCurrentLine().getCharsLength()) {
          console.log(this._carret.getPos().x + 1, this.getCurrentLine().getCharsLength());
          this._carret.setPosX(this._carret.getPos().x + 1);
        }
      }
    });

    this._element.addEventListener('keypress', (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.key === 'Enter') {
        this.addLine();
      } else if (e.key === 'Delete') {
        this.removeCharByDelete();
      } else {
        this.addChar(e.key);
      }
    });
  }

  getRect() {
    return this._element.getBoundingClientRect();
  }

  getLinesLength() {
    return this._lines.length;
  }

  getCurrentLine() {
    const pos = this._carret.getPos();

    return this._lines[pos.y];
  }

  getElement() {
    return this._element;
  }

  addLine() {
    this._lines.push(new Line(this));
    this._carret.setPos(0, this._lines.length - 1);
  }

  addChar(charValue: string) {
    const currentLine = this.getCurrentLine();

    if (currentLine) {
      currentLine.addChar(charValue, this._carret.getPos().x);

      this._carret.setPosX(this._carret.getPos().x + 1);
    }
  }

  removeCharByBackspace() {
    const currentLine = this._lines[this._carret.getPos().y];
    if (currentLine) {
      if (this._carret.getPos().x - 1 >= 0) {
        currentLine.removeChar(this._carret.getPos().x - 1);
        this._carret.setPosX(this._carret.getPos().x - 1);
      } else if (this._carret.getPos().x - 1 < 0) {
        if (this._carret.getPos().y - 1 >= 0) {
          currentLine.remove();
          this._carret.setPosY(this._carret.getPos().y - 1);
          this._carret.setPosX(this.getCurrentLine().getCharsLength());
        }
      }
    }
  }

  removeCharByDelete() {
    const currentLine = this._lines[this._carret.getPos().y];

    if (currentLine) {
      currentLine.removeChar(this._carret.getPos().x);
    }
  }

  createText() {
    if (this.options?.text) {
      this.options.text.split('').forEach((char) => {
        this.addChar(char);
      });
    }
  }
}
