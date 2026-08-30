import React from 'react';
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import type { ShellContextInterface, ShellMetadata } from '../../declaration/shell';
import { renderView } from '../../../view/renderable-view';
import { useShellDismissRequest } from './shell-dismiss-request.ts';
import { shouldCommitShellDismiss } from './shell-dismiss.ts';

interface ShellHostProps {
  readonly children: React.ReactNode;
  readonly dismiss: () => void | Promise<void>;
  readonly metadata: ShellMetadata;
}

const DISMISS_DURATION = 180;
const HORIZONTAL_TOLERANCE = 24;
const VERTICAL_ACTIVATION_DISTANCE = 8;

export const ShellHost: React.FC<ShellHostProps> = (props) => {
  const { dismiss } = props;
  const { height } = useWindowDimensions();
  const requestDismiss = useShellDismissRequest(dismiss);
  const translationY = useSharedValue(0);
  const dismissDistance = Math.max(height, 1);

  const gesture = Gesture.Pan()
    .activeOffsetY(VERTICAL_ACTIVATION_DISTANCE)
    .failOffsetX([-HORIZONTAL_TOLERANCE, HORIZONTAL_TOLERANCE])
    .onBegin(() => {
      cancelAnimation(translationY);
    })
    .onUpdate((event) => {
      translationY.value = Math.max(0, event.translationY);
    })
    .onEnd((event, success) => {
      if (!success) return;

      const shouldDismiss = shouldCommitShellDismiss({
        distance: translationY.value,
        height: dismissDistance,
        velocityY: event.velocityY,
      });

      if (!shouldDismiss) {
        translationY.value = withSpring(0, {
          damping: 28,
          overshootClamping: true,
          stiffness: 320,
          velocity: event.velocityY,
        });
        return;
      }

      translationY.value = withTiming(dismissDistance, { duration: DISMISS_DURATION }, (finished) => {
        if (finished) scheduleOnRN(requestDismiss);
      });
    })
    .onFinalize((_event, success) => {
      if (!success && translationY.value > 0) {
        translationY.value = withSpring(0, {
          damping: 28,
          overshootClamping: true,
          stiffness: 320,
        });
      }
    });
  const backdropStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translationY.value, [0, dismissDistance], [1, 0], Extrapolation.CLAMP),
  }));
  const frameStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translationY.value }],
  }));
  const context: ShellContextInterface = React.useMemo(() => ({ children: props.children }), [props.children]);

  return (
    <View accessibilityViewIsModal style={styles.overlay}>
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        <Pressable
          accessibilityLabel="Close frame"
          accessibilityRole="button"
          onPress={requestDismiss}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.frame, frameStyle]}>{renderView(props.metadata.view, context)}</Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.56)',
  },
  frame: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
});
