import React from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';

import type { RouteActivationRuntime } from '../../../../core/router/runtime/route-runtime';
import type { ModuleMetadata } from '../../declaration/module';
interface ModuleRefreshPresentationProps {
  readonly children: React.ReactNode;
  readonly runtime: RouteActivationRuntime<ModuleMetadata>;
}

export const ModuleRefreshPresentation: React.FC<ModuleRefreshPresentationProps> = (props) => {
  const [refreshEnabled, setRefreshEnabled] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const updateRefreshEnabled = React.useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setRefreshEnabled(event.nativeEvent.contentOffset.y <= 0);
  }, []);
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
      onMomentumScrollEnd={updateRefreshEnabled}
      onScrollBeginDrag={updateRefreshEnabled}
      onScrollEndDrag={updateRefreshEnabled}
      refreshControl={
        <RefreshControl enabled={refreshEnabled} onRefresh={() => void handleRefresh()} refreshing={refreshing} />
      }
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
