import React from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';

import type { RouteActivationRuntime } from '../../../../core/router/runtime/route-runtime';
import type { ModuleMetadata } from '../../declaration/module';

interface ModuleRefreshPresentationProps {
  readonly children: React.ReactNode;
  readonly runtime: RouteActivationRuntime<ModuleMetadata>;
}

export const ModuleRefreshPresentation: React.FC<ModuleRefreshPresentationProps> = (props) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const handleRefresh = React.useCallback(async () => {
    setRefreshing(true);

    try {
      await props.runtime.revalidate();
    } finally {
      setRefreshing(false);
    }
  }, [props.runtime]);

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl onRefresh={() => void handleRefresh()} refreshing={refreshing} />}
      style={styles.root}
    >
      {props.children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
  root: {
    flex: 1,
  },
});
