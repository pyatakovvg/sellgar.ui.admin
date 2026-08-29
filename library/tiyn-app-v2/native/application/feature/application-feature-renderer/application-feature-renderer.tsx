import React from 'react';

import type { ApplicationFeatureInterface } from '../../../../core/application/feature/application-feature';

export type ApplicationFeatureRenderer = () => React.ReactNode;

const applicationFeatureRenderers = new WeakMap<ApplicationFeatureInterface, ApplicationFeatureRenderer>();

export const configureApplicationFeatureRenderer = (
  feature: ApplicationFeatureInterface,
  renderer: ApplicationFeatureRenderer,
): void => {
  applicationFeatureRenderers.set(feature, renderer);
};

export const renderApplicationFeatures = (features: readonly ApplicationFeatureInterface[]): React.ReactNode => {
  return features.map((feature, index) => {
    const render = applicationFeatureRenderers.get(feature);

    return render ? <React.Fragment key={index}>{render()}</React.Fragment> : null;
  });
};
