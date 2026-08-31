import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { ProductModifyRoute } from '@library/route-tokens';
import type { RouteParams } from '@sellgar/app-v2';
import { NavItem, useLoaderData, useNavigate, useParams, useSubmit } from '@sellgar/app-v2/native';

import { ProductDetailControllerInterface } from '../classes/controller/product-detail/product-detail-controller.interface.ts';

export const ModuleView: React.FC = () => {
  const params = useParams<RouteParams<typeof ProductModifyRoute>>();
  const navigate = useNavigate();
  const runtime = useLoaderData(ProductDetailControllerInterface);
  const expireSession = useSubmit(ProductDetailControllerInterface);

  return (
    <View style={styles.content}>
      <Text style={styles.eyebrow}>Product stack screen</Text>
      <Text style={styles.title}>{params.uuid}</Text>
      <Text style={styles.copy}>
        Params are resolved by core. Native Stack only presents the committed logical Route branch.
      </Text>
      <Text style={styles.probe}>
        controller #{runtime.instance}, loader #{runtime.loads}, {runtime.duration} ms
      </Text>
      <NavItem
        navigation={(navigation) => navigation.to(ProductModifyRoute, { params: { uuid: 'native-84' }, replace: true })}
      >
        {({ execute, isPending }) => (
          <Pressable
            accessibilityLabel="Open product native-84"
            accessibilityRole="button"
            accessibilityState={{ busy: isPending }}
            disabled={isPending}
            onPress={() => void execute()}
            style={({ pressed }) => [styles.button, pressed ? styles.pressed : null]}
          >
            {isPending ? (
              <ActivityIndicator color="#11131a" />
            ) : (
              <Text style={styles.buttonText}>Open product native-84</Text>
            )}
          </Pressable>
        )}
      </NavItem>
      <Pressable
        accessibilityLabel="Simulate protected 401"
        accessibilityRole="button"
        accessibilityState={{ busy: expireSession.inProcess }}
        disabled={expireSession.inProcess}
        onPress={() => void expireSession()}
        style={({ pressed }) => [styles.button, pressed ? styles.pressed : null]}
      >
        {expireSession.inProcess ? (
          <ActivityIndicator color="#11131a" />
        ) : (
          <Text style={styles.buttonText}>Simulate protected 401</Text>
        )}
      </Pressable>
      <Pressable
        accessibilityLabel="Back to products"
        accessibilityRole="button"
        onPress={() => void navigate.back()}
        style={({ pressed }) => [styles.button, pressed ? styles.pressed : null]}
      >
        <Text style={styles.buttonText}>Back to products</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: { alignItems: 'center', backgroundColor: '#9d91ff', borderRadius: 14, height: 52, justifyContent: 'center' },
  buttonText: { color: '#11131a', fontSize: 16, fontWeight: '700' },
  content: { flex: 1, gap: 16, justifyContent: 'center', padding: 24, backgroundColor: '#11131a' },
  copy: { color: '#a9adba', fontSize: 16, lineHeight: 23 },
  eyebrow: { color: '#9d91ff', fontSize: 13, fontWeight: '700', letterSpacing: 0.6 },
  pressed: { opacity: 0.78 },
  probe: { color: '#6fd6b3', fontSize: 14, fontWeight: '700' },
  title: { color: '#f7f7fb', fontSize: 34, fontWeight: '800' },
});
