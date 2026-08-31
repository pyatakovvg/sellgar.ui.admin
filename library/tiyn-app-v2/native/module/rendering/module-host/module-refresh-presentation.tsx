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
import { ModuleRefreshGesture } from './module-refresh-gesture.ts';

interface ModuleRefreshPresentationProps {
  readonly children: React.ReactNode;
  readonly runtime: RouteActivationRuntime<ModuleMetadata>;
}

export const ModuleRefreshPresentation: React.FC<ModuleRefreshPresentationProps> = (props) => {
  const gesture = React.useRef(new ModuleRefreshGesture()).current;
  const refreshEnabledRef = React.useRef(true);
  const [refreshEnabled, setRefreshEnabled] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const updateRefreshEnabled = React.useCallback((enabled: boolean) => {
    if (refreshEnabledRef.current === enabled) return;

    refreshEnabledRef.current = enabled;
    setRefreshEnabled(enabled);
  }, []);
  const handleRefresh = React.useCallback(async () => {
    if (!gesture.canRefresh()) return;

    setRefreshing(true);

    try {
      await props.runtime.revalidate();
    } finally {
      setRefreshing(false);
    }
  }, [gesture, props.runtime]);
  const handleScroll = React.useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      updateRefreshEnabled(gesture.scroll(event.nativeEvent.contentOffset.y));
    },
    [gesture, updateRefreshEnabled],
  );
  const handleScrollBeginDrag = React.useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      updateRefreshEnabled(gesture.begin(event.nativeEvent.contentOffset.y));
    },
    [gesture, updateRefreshEnabled],
  );
  const handleScrollEndDrag = React.useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      updateRefreshEnabled(gesture.end(event.nativeEvent.contentOffset.y));
    },
    [gesture, updateRefreshEnabled],
  );

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      onScroll={handleScroll}
      onScrollBeginDrag={handleScrollBeginDrag}
      onScrollEndDrag={handleScrollEndDrag}
      refreshControl={
        <RefreshControl enabled={refreshEnabled} onRefresh={() => void handleRefresh()} refreshing={refreshing} />
      }
      scrollEventThrottle={16}
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
