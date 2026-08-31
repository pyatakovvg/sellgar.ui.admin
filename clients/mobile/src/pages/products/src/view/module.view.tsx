import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BrandsRoute, ProductModifyRoute } from '@library/route-tokens';
import { useLoaderData, useNavigate, useSubmit } from '@sellgar/app-v2/native';

import { ProductsFilterControllerInterface } from '../classes/controller/products-filter/products-filter-controller.interface.ts';
import { ProductsControllerInterface } from '../classes/controller/products/products-controller.interface.ts';
import { Action } from './action.tsx';
import { FeaturePlayground } from './feature-playground.tsx';

export const ModuleView: React.FC = () => {
  const navigate = useNavigate();
  const runtime = useLoaderData(ProductsControllerInterface);
  const filter = useLoaderData(ProductsFilterControllerInterface);
  const submitFilter = useSubmit(ProductsFilterControllerInterface);

  return (
    <View style={styles.content}>
      <Text style={styles.eyebrow}>Products tab</Text>
      <Text style={styles.title}>Products</Text>
      <Text style={styles.copy}>This tab owns an ordinary Route.routes stack.</Text>
      <Text style={styles.probe}>
        controller #{runtime.instance}, loader #{runtime.loads}, {runtime.duration} ms
      </Text>
      <Text style={styles.query}>query search: {filter.search ?? 'none'}</Text>
      <Text style={styles.query}>data filter: {runtime.search ?? 'none'}</Text>
      <Action
        inProcess={submitFilter.inProcess}
        label={filter.search ? 'Clear query' : 'Set query native'}
        onPress={() => void submitFilter({ search: filter.search ? null : 'native' })}
      />
      <Action
        label="Open product native-42"
        onPress={() => void navigate.to(ProductModifyRoute, { params: { uuid: 'native-42' } })}
      />
      <Action label="Open brands tab" onPress={() => void navigate.to(BrandsRoute)} />
      <FeaturePlayground />
    </View>
  );
};

const styles = StyleSheet.create({
  content: { flex: 1, gap: 16, justifyContent: 'center', padding: 24, paddingBottom: 48, backgroundColor: '#11131a' },
  copy: { color: '#a9adba', fontSize: 16, lineHeight: 23 },
  eyebrow: { color: '#9d91ff', fontSize: 13, fontWeight: '700', letterSpacing: 0.6 },
  probe: { color: '#6fd6b3', fontSize: 14, fontWeight: '700' },
  query: { color: '#d7d9e2', fontSize: 14, fontWeight: '600' },
  title: { color: '#f7f7fb', fontSize: 34, fontWeight: '800' },
});
