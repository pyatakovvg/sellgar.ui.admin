import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandsRoute, ProductsRoute } from '@library/route-tokens';
import type { NavigationRequestFactory } from '@sellgar/app-v2';
import { TabItem, type LayoutViewProps, useSafeAreaInsets, WidgetHost } from '@sellgar/app-v2/native';

import { SignOutWidget } from '../../../../widgets/sign-out/src';

export const LayoutView: React.FC<LayoutViewProps> = (props) => {
  return (
    <View style={styles.root}>
      <View style={styles.content}>{props.children}</View>
      <View style={styles.tabs}>
        <NavigationTab caption="Products" navigation={(navigate) => navigate.to(ProductsRoute)} />
        <NavigationTab caption="Brands" navigation={(navigate) => navigate.to(BrandsRoute)} />
        <WidgetHost token={SignOutWidget} />
      </View>
    </View>
  );
};

interface NavigationTabProps {
  readonly caption: string;
  readonly navigation: NavigationRequestFactory;
}

const NavigationTab: React.FC<NavigationTabProps> = (props) => {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <TabItem navigation={props.navigation}>
      {({ isActive, isPending, tab }) => (
        <Pressable
          {...tab}
          style={({ pressed }) => [
            styles.tab,
            { paddingBottom: safeAreaInsets.bottom },
            isActive && styles.tabActive,
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{isPending ? '…' : props.caption}</Text>
        </Pressable>
      )}
    </TabItem>
  );
};

const styles = StyleSheet.create({
  content: { flex: 1 },
  pressed: { opacity: 0.72 },
  root: { flex: 1 },
  tab: { alignItems: 'center', flex: 1, justifyContent: 'center', minHeight: 58 },
  tabActive: { backgroundColor: '#292d3d' },
  tabLabel: { color: '#8e94a5', fontSize: 13, fontWeight: '600' },
  tabLabelActive: { color: '#b9b0ff' },
  tabs: { backgroundColor: '#1a1d27', flexDirection: 'row', minHeight: 58 },
});
