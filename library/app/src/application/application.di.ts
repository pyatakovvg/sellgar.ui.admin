import { Container } from 'inversify';

import { ProfileController, ProfileControllerSymbol } from './controller/profile.controller.ts';
import { ApplicationController, ApplicationControllerSymbol } from './controller/application.controller.ts';

import { GetUserCase, GetUserCaseSymbol } from './case/get-user.case.ts';
import { SignInCase, SignInUserCaseSymbol } from './case/sign-in.case.ts';
import { SignOutCase, SignOutUserCaseSymbol } from './case/sign-out.case.ts';

import { UserService, UserServiceSymbol } from './service/user.service.ts';

import { UserRepository, UserRepositorySymbol } from './repository/user.repository.ts';

const container = new Container();

container.bind<ProfileController>(ProfileControllerSymbol).to(ProfileController);
container.bind<ApplicationController>(ApplicationControllerSymbol).to(ApplicationController);

container.bind<GetUserCase>(GetUserCaseSymbol).to(GetUserCase);
container.bind<SignInCase>(SignInUserCaseSymbol).to(SignInCase);
container.bind<SignOutCase>(SignOutUserCaseSymbol).to(SignOutCase);

container.bind<UserService>(UserServiceSymbol).to(UserService);

container.bind<UserRepository>(UserRepositorySymbol).to(UserRepository);

export { container };
