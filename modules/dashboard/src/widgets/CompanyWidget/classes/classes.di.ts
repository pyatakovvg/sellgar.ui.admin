import { HttpClient, HttpClientSymbol } from '@library/infra';

import { Container } from 'inversify';

import { CompanyGateway, CompanyGatewaySymbol } from './gateway/company.gateway.ts';

import { CompanyService, CompanyServiceSymbol } from './service/company.service.ts';

import { GetCompanyCase, GetCompanyCaseSymbol } from './case/get-company.case.ts';

import { CompanyPresenter, CompanyPresenterSymbol } from './presenter/company.presenter.ts';

const container = new Container();

container.bind<HttpClient>(HttpClientSymbol).to(HttpClient);

container.bind<CompanyGateway>(CompanyGatewaySymbol).to(CompanyGateway);

container.bind<CompanyService>(CompanyServiceSymbol).to(CompanyService);

container.bind<GetCompanyCase>(GetCompanyCaseSymbol).to(GetCompanyCase);

container.bind<CompanyPresenter>(CompanyPresenterSymbol).to(CompanyPresenter);

export { container };
