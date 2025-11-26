export type TListener = (newUrl: string, oldUrl: string) => void;

export class URLChangeObserver {
  private listeners: TListener[] = [];
  private currentUrl: string;

  constructor() {
    this.listeners = [];
    this.currentUrl = window.location.href;

    this.setupHistoryIntercept();
  }

  setupHistoryIntercept() {
    const originalReplaceState = history.replaceState;
    // const originalPushState = history.pushState;

    window.history.replaceState = (...args) => {
      originalReplaceState.apply(history, args);
      this.handleUrlChange();
    };

    // window.history.pushState = (...args) => {
    //   originalPushState.apply(history, args);
    //   this.handleUrlChange();
    // };
    //
    // window.addEventListener('popstate', this.handleUrlChange.bind(this));
  }

  handleUrlChange() {
    const newUrl = window.location.href;

    if (newUrl !== this.currentUrl) {
      const oldUrl = this.currentUrl;

      this.currentUrl = newUrl;

      this.listeners.forEach((listener) => {
        listener(newUrl, oldUrl);
      });
    }
  }

  subscribe(listener: TListener) {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
}
