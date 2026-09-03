import React from 'react';

import type { NavigationBlockerViewProps } from '@sellgar/app-v2/native';

import { Dialog } from '../../../shared/ui/dialog';

export const NavigationBlocker: React.FC<NavigationBlockerViewProps> = (props) => (
  <Dialog
    actions={[
      { label: 'Stay', onPress: props.stay },
      { label: 'Leave', onPress: props.leave, tone: 'destructive' },
    ]}
    description="Unsaved changes will be lost."
    title="Leave this screen?"
  />
);
