import { injectable, inject } from 'inversify';

import { LngStore, LngStoreSymbol } from '../stores/lng.store.ts';
import { LngService, LngServiceSymbol } from '../services/lng.service.ts';

export const LngPresenterSymbol = Symbol.for('LngPresenter');

@injectable()
export class LngPresenter {
  constructor(
    @inject(LngStoreSymbol) private readonly lngStore: LngStore,
    @inject(LngServiceSymbol) private readonly lngService: LngService,
  ) {
    this._init();
  }

  private _init() {
    this.lngService.init().then(() => {
      this.lngStore.setInitialized();
    });
  }

  isLoadingResource() {
    return this.lngStore.getLoadingResource();
  }

  isInitialized() {
    return this.lngStore.isInitialized;
  }

  getI18NextInstance() {
    return this.lngService.getInstance();
  }

  detectedLanguage() {
    return this.lngService.getLanguage();
  }

  changeLanguage(lang: string) {
    this.lngService.changeLanguage(lang);
  }

  loadLanguageDictionary(ns: string, resource: any) {
    Object.keys(resource).forEach((key) => {
      this.lngService.loadLanguageDictionary(key, ns, resource[key]);
    });
  }
}
