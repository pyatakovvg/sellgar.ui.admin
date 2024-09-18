import {
  HttpClient,
  HttpClientSymbol,
  CompanyService,
  CompanyServiceSymbol,
  CompanyGateway,
  CompanyGatewaySymbol,
} from '@library/domain';

import { Container } from 'inversify';

import { GetCompanyCase, GetCompanyCaseSymbol } from './case/get-company.case.ts';

import { CompanyStore, CompanyStoreSymbol } from './store/company.store.ts';
import { CompanyPresenter, CompanyPresenterSymbol } from './presenter/company.presenter.ts';

const container = new Container();

container.bind<HttpClient>(HttpClientSymbol).to(HttpClient);

container.bind<CompanyGateway>(CompanyGatewaySymbol).to(CompanyGateway);
container.bind<CompanyService>(CompanyServiceSymbol).to(CompanyService);

container.bind<GetCompanyCase>(GetCompanyCaseSymbol).to(GetCompanyCase);

container.bind<CompanyStore>(CompanyStoreSymbol).to(CompanyStore);
container.bind<CompanyPresenter>(CompanyPresenterSymbol).to(CompanyPresenter);

export { container };
