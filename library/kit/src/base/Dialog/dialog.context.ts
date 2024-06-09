import React from 'react';

interface DialogContext {}

export const DialogContext = React.createContext<DialogContext>({});
export const DialogProvider = DialogContext.Provider;
