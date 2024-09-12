import {
  HttpClient,
  HttpClientSymbol,
  BrandService,
  BrandServiceSymbol,
  ProductService,
  ProductServiceSymbol,
  CategoryService,
  CategoryServiceSymbol,
  BrandGateway,
  BrandGatewaySymbol,
  ProductGateway,
  ProductGatewaySymbol,
  CategoryGateway,
  CategoryGatewaySymbol,
} from '@library/domain';

import { Container } from 'inversify';

import { UpdateProductCase, UpdateProductCaseSymbol } from './case/update-product.case.ts';
import { CreateProductCase, CreateProductCaseSymbol } from './case/create-product.case.ts';
import { GetOptionalDataCase, GetOptionalDataCaseSymbol } from './case/get-optional-data.case.ts';
import { GetProductByUuidCase, GetProductByUuidCaseSymbol } from './case/get-product-by-uuid.case.ts';

import { ProductPresenter, ProductPresenterSymbol } from './presenter/product.presenter';

const container = new Container();

container.bind<HttpClient>(HttpClientSymbol).to(HttpClient);

container.bind<BrandGateway>(BrandGatewaySymbol).to(BrandGateway);
container.bind<ProductGateway>(ProductGatewaySymbol).to(ProductGateway);
container.bind<CategoryGateway>(CategoryGatewaySymbol).to(CategoryGateway);

container.bind<BrandService>(BrandServiceSymbol).to(BrandService);
container.bind<ProductService>(ProductServiceSymbol).to(ProductService);
container.bind<CategoryService>(CategoryServiceSymbol).to(CategoryService);

container.bind<CreateProductCase>(CreateProductCaseSymbol).to(CreateProductCase);
container.bind<UpdateProductCase>(UpdateProductCaseSymbol).to(UpdateProductCase);
container.bind<GetOptionalDataCase>(GetOptionalDataCaseSymbol).to(GetOptionalDataCase);
container.bind<GetProductByUuidCase>(GetProductByUuidCaseSymbol).to(GetProductByUuidCase);

container.bind<ProductPresenter>(ProductPresenterSymbol).to(ProductPresenter);

export { container };
