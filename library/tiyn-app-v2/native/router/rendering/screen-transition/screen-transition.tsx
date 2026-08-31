import React from 'react';
import { StyleSheet, useWindowDimensions, type ViewProps } from 'react-native';
import Animated, {
  cancelAnimation,
  FadeOut,
  SlideOutDown,
  SlideOutLeft,
  SlideOutRight,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { RouteAnimation, type RouteAnimation as RouteAnimationValue } from '../../declaration/route/route.ts';

interface ScreenTransitionProps {
  readonly accessibilityElementsHidden?: ViewProps['accessibilityElementsHidden'];
  readonly animation: RouteAnimationValue | undefined;
  readonly backInProgress: boolean;
  readonly children: React.ReactNode;
  readonly focused: boolean;
  readonly forward: boolean;
  readonly importantForAccessibility?: ViewProps['importantForAccessibility'];
  readonly order: number;
  readonly pointerEvents?: ViewProps['pointerEvents'];
  readonly topOrder: number;
}

const TRANSITION_DURATION = 250;

export const ScreenTransition: React.FC<ScreenTransitionProps> = (props) => {
  const dimensions = useWindowDimensions();
  const animation = props.animation;
  const focused = props.focused;
  const order = props.order;
  const topOrder = props.topOrder;
  const enterOnMount = Boolean(animation && focused && props.forward && !props.backInProgress);
  const progress = useSharedValue(enterOnMount ? 0 : 1);
  const exiting = useSharedValue(0);
  const mounted = React.useRef(false);
  const previouslyFocused = React.useRef(props.focused);

  React.useLayoutEffect(() => {
    if (!mounted.current) {
      mounted.current = true;

      if (enterOnMount) {
        progress.value = withTiming(1, { duration: TRANSITION_DURATION });
      }

      return;
    }

    const wasFocused = previouslyFocused.current;

    previouslyFocused.current = props.focused;

    if (!props.animation || wasFocused === props.focused) return;

    cancelAnimation(progress);

    if (props.focused) {
      exiting.value = 0;

      if (props.forward && !props.backInProgress) {
        progress.value = 0;
        progress.value = withTiming(1, { duration: TRANSITION_DURATION });
      } else {
        progress.value = 1;
      }

      return;
    }

    if (props.backInProgress) {
      exiting.value = 1;
      progress.value = withTiming(0, { duration: TRANSITION_DURATION }, () => {
        exiting.value = 0;
      });
    }
  }, [enterOnMount, exiting, progress, props.animation, props.backInProgress, props.focused, props.forward]);

  const animatedStyle = useAnimatedStyle(() => {
    const distance = 1 - progress.value;
    const zIndex = exiting.value > 0 ? topOrder + 1 : focused ? topOrder : order;

    switch (animation) {
      case RouteAnimation.Fade:
        return { opacity: progress.value, zIndex };
      case RouteAnimation.SlideFromBottom:
        return { transform: [{ translateY: dimensions.height * distance }], zIndex };
      case RouteAnimation.SlideFromLeft:
        return { transform: [{ translateX: -dimensions.width * distance }], zIndex };
      case RouteAnimation.SlideFromRight:
        return { transform: [{ translateX: dimensions.width * distance }], zIndex };
      default:
        return { zIndex };
    }
  });
  const leaving = props.animation && props.backInProgress ? resolveExitingAnimation(props.animation) : undefined;

  return (
    <Animated.View
      accessibilityElementsHidden={props.accessibilityElementsHidden}
      exiting={leaving}
      importantForAccessibility={props.importantForAccessibility}
      pointerEvents={props.pointerEvents}
      style={[StyleSheet.absoluteFill, animatedStyle]}
    >
      {props.children}
    </Animated.View>
  );
};

const resolveExitingAnimation = (animation: RouteAnimationValue) => {
  switch (animation) {
    case RouteAnimation.Fade:
      return FadeOut.duration(TRANSITION_DURATION);
    case RouteAnimation.SlideFromBottom:
      return SlideOutDown.duration(TRANSITION_DURATION);
    case RouteAnimation.SlideFromLeft:
      return SlideOutLeft.duration(TRANSITION_DURATION);
    case RouteAnimation.SlideFromRight:
      return SlideOutRight.duration(TRANSITION_DURATION);
  }
};
