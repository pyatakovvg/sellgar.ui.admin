import React from 'react';
import { AppRegistry, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

import { ScreenAnimation, ScreenRenderer, type ScreenPresentation } from '@sellgar/app-v2/native';

import { name as appName } from '../../app.json';

interface VisualSample {
  readonly accent: string;
  readonly background: string;
  readonly label: string;
}

const samples: readonly VisualSample[] = Object.freeze([
  Object.freeze({ accent: '#b6a8ff', background: '#19162b', label: 'Violet' }),
  Object.freeze({ accent: '#79dcff', background: '#10232b', label: 'Cyan' }),
  Object.freeze({ accent: '#ffae73', background: '#2c1b12', label: 'Orange' }),
  Object.freeze({ accent: '#74e5a1', background: '#10251a', label: 'Green' }),
]);

const ScreenRendererPlayground: React.FC = () => {
  const sequence = React.useRef(0);
  const [presentation, setPresentation] = React.useState<ScreenPresentation | null>(() =>
    createPresentation(samples[0]!, 0),
  );

  const show = React.useCallback((animation?: ScreenAnimation) => {
    sequence.current += 1;
    const index = sequence.current;

    setPresentation(createPresentation(samples[index % samples.length]!, index, animation));
  }, []);

  const updateCurrent = React.useCallback(() => {
    setPresentation((current) => {
      if (!current) return createPresentation(samples[0]!, sequence.current);

      return Object.freeze({
        ...current,
        content: createScreenContent(samples[sequence.current % samples.length]!, current.key, Date.now()),
      });
    });
  }, []);

  const burst = React.useCallback(() => {
    const animations = [
      undefined,
      ScreenAnimation.Fade,
      ScreenAnimation.SlideFromRight,
      ScreenAnimation.SlideFromLeft,
      ScreenAnimation.SlideFromBottom,
    ] as const;
    let remaining = 40;

    const frame = () => {
      sequence.current += 1;
      const index = sequence.current;
      const animation = animations[index % animations.length];

      setPresentation(createPresentation(samples[index % samples.length]!, index, animation));
      remaining -= 1;

      if (remaining > 0) requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  }, []);

  return (
    <View style={styles.application}>
      <StatusBar backgroundColor="#090b10" barStyle="light-content" />

      <ScreenRenderer presentation={presentation} style={styles.renderer} />

      <View style={styles.controls}>
        <Text style={styles.heading}>SCREEN AUTOMATON</Text>
        <ScrollView contentContainerStyle={styles.actions} horizontal showsHorizontalScrollIndicator={false}>
          <Action label="Static" onPress={() => show()} />
          <Action label="Fade" onPress={() => show(ScreenAnimation.Fade)} />
          <Action label="From right" onPress={() => show(ScreenAnimation.SlideFromRight)} />
          <Action label="From left" onPress={() => show(ScreenAnimation.SlideFromLeft)} />
          <Action label="From bottom" onPress={() => show(ScreenAnimation.SlideFromBottom)} />
          <Action label="Same screen" onPress={updateCurrent} />
          <Action label="Burst ×40" onPress={burst} />
          <Action label="Empty" onPress={() => setPresentation(null)} />
        </ScrollView>
      </View>
    </View>
  );
};

interface ActionProps {
  readonly label: string;
  onPress(): void;
}

const Action: React.FC<ActionProps> = ({ label, onPress }) => {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.action, pressed && styles.actionPressed]}
    >
      <Text style={styles.actionText}>{label}</Text>
    </Pressable>
  );
};

const createPresentation = (
  sample: VisualSample,
  sequence: number,
  animation?: ScreenAnimation,
): ScreenPresentation => {
  const key = `screen-${sequence}`;

  return Object.freeze({
    content: createScreenContent(sample, key, 0),
    key,
    transition: animation ? Object.freeze({ animation, operation: 'present' }) : undefined,
  });
};

const createScreenContent = (sample: VisualSample, key: string, revision: number): React.ReactNode => {
  return (
    <View accessibilityLabel={`Visible ${key}`} style={[styles.screen, { backgroundColor: sample.background }]}>
      <View style={[styles.marker, { backgroundColor: sample.accent }]} />
      <Text style={[styles.screenTitle, { color: sample.accent }]}>{sample.label}</Text>
      <Text style={styles.screenKey}>{key}</Text>
      <Text style={styles.screenRevision}>content revision: {revision}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  action: {
    backgroundColor: '#232632',
    borderColor: '#3b4050',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  actionPressed: {
    backgroundColor: '#34394a',
  },
  actionText: {
    color: '#f3f4f8',
    fontSize: 13,
    fontWeight: '600',
  },
  actions: {
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  application: {
    backgroundColor: '#090b10',
    flex: 1,
  },
  controls: {
    backgroundColor: '#11141c',
    borderTopColor: '#292d39',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingBottom: 8,
  },
  heading: {
    color: '#747b8e',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  marker: {
    borderRadius: 24,
    height: 48,
    marginBottom: 18,
    width: 48,
  },
  renderer: {
    flex: 1,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  screenKey: {
    color: '#d3d5dd',
    fontSize: 16,
    marginTop: 8,
  },
  screenRevision: {
    color: '#888e9e',
    fontSize: 13,
    marginTop: 6,
  },
  screenTitle: {
    fontSize: 42,
    fontWeight: '800',
  },
});

AppRegistry.registerComponent(appName, () => ScreenRendererPlayground);
