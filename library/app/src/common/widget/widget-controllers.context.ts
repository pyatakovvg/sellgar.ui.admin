import React from 'react';
import { ServiceIdentifier } from 'inversify';

export type WidgetControllersMap = Map<ServiceIdentifier, unknown> | null;

export const WidgetControllersContext = React.createContext<WidgetControllersMap>(null);
