import { Container } from 'inversify';

import { BreadcrumbStore, BreadcrumbStoreSymbol } from './stores/breadcrumbs.store.ts';
import { BreadcrumbPresenter, BreadcrumbPresenterSymbol } from './presenters/breadcrumb.presenter.ts';

const container = new Container();

container.bind<BreadcrumbStore>(BreadcrumbStoreSymbol).to(BreadcrumbStore);

container.bind<BreadcrumbPresenter>(BreadcrumbPresenterSymbol).to(BreadcrumbPresenter);

export { container };
