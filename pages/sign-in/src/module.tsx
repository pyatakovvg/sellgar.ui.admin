import { Module } from '@library/app';

import React from 'react';

import { SignInView } from './view';

import { containerModule } from './classes/classes.di.ts';
import { SignInControllerInterface } from './classes/controller/sign-in-controller.interface.ts';

@Module({
  imports: [containerModule],
  controllers: [SignInControllerInterface],
  view: <SignInView />,
})
export class SignInModule {}
