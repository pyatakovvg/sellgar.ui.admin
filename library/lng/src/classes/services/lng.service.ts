import { ConfigInterface } from '@library/domain';

import * as i18n from 'i18next';
import { inject, injectable } from 'inversify';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export const LngServiceSymbol = Symbol.for('LngService');

@injectable()
export class LngService {
  private readonly _instance;

  constructor(@inject(ConfigInterface) private readonly config: ConfigInterface) {
    this._instance = i18n.createInstance();

    this._initLanguageDetector();
    this._initI18NextReact();
  }

  private _initLanguageDetector() {
    const languageDetector = new LanguageDetector();

    this._instance.use(languageDetector);
  }

  private _initI18NextReact() {
    this._instance.use(initReactI18next);
  }

  init() {
    return this._instance.init({
      debug: this.config.get('NODE_ENV') === 'development',
      lng: window.navigator.language.replace(/-.*/, ''),
      fallbackLng: 'ru',
      nonExplicitSupportedLngs: false,
      defaultNS: false,
      supportedLngs: ['ru', 'en', 'kz'],
      appendNamespaceToCIMode: false,
      partialBundledLanguages: true,
      compatibilityJSON: 'v4',
      backend: false,
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    });
  }

  getInstance() {
    return this._instance;
  }

  getLanguage() {
    return this._instance.language;
  }

  changeLanguage(lang: string) {
    return this._instance.changeLanguage(lang);
  }

  loadLanguageDictionary(lang: string, ns: string, resource: any) {
    this._instance.addResourceBundle(lang, ns, resource, true);
  }
}
