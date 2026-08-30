import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Layout, type LayoutViewProps } from '@sellgar/app-v2/native';

const LayoutView: React.FC<LayoutViewProps> = (props) => <View style={styles.root}>{props.children}</View>;

@Layout({ view: LayoutView })
export class BaseLayout {}

const styles = StyleSheet.create({
  root: { backgroundColor: '#11131a', flex: 1 },
});
