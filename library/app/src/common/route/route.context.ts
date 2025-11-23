import React from 'react';

interface IContext {}

export const context = React.createContext({} as IContext);
export const Provider = context.Provider;
