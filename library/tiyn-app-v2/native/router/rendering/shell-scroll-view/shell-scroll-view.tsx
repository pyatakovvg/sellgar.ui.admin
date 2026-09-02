import React from 'react';
import {
  ScrollView as ReactNativeScrollView,
  StyleSheet,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type ScrollViewProps,
} from 'react-native';
import { ScrollView as GestureScrollView } from 'react-native-gesture-handler';
import {
  KeyboardAwareScrollView,
  type KeyboardAwareScrollViewProps,
  type KeyboardAwareScrollViewRef,
} from 'react-native-keyboard-controller';

import { resolveKeyboardScrollProps } from '../../../keyboard/scroll/keyboard-scroll-props';
import { useShellRuntime } from '../../runtime/shell-runtime-context';

export type ShellScrollViewProps = ScrollViewProps;

const KeyboardGestureScrollView = React.forwardRef<
  React.ComponentRef<typeof GestureScrollView>,
  React.ComponentProps<typeof GestureScrollView>
>((props, ref) => {
  const runtime = useShellRuntime();

  return <GestureScrollView {...props} ref={ref} simultaneousWith={runtime.dismissGesture} />;
});

// KeyboardAwareScrollView officially supports Gesture Handler's ScrollView,
// but their public component types diverge under RN 0.86/Reanimated 4.
const ShellKeyboardScrollViewComponent = KeyboardGestureScrollView as NonNullable<
  KeyboardAwareScrollViewProps['ScrollViewComponent']
>;

export const ShellScrollView = React.forwardRef<React.ComponentRef<typeof ReactNativeScrollView>, ShellScrollViewProps>(
  (props, ref) => {
    const runtime = useShellRuntime();
    const keyboardScrollProps = resolveKeyboardScrollProps(props);
    const scrollRef = React.useRef<KeyboardAwareScrollViewRef | null>(null);
    const setScrollRef = React.useCallback(
      (value: KeyboardAwareScrollViewRef | null) => {
        scrollRef.current = value;

        if (typeof ref === 'function') ref(value);
        else if (ref) ref.current = value;
      },
      [ref],
    );
    const handleScroll = React.useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        runtime.scrollOffset.value = Math.max(0, event.nativeEvent.contentOffset.y);
        props.onScroll?.(event);
      },
      [props.onScroll, runtime.scrollOffset],
    );
    const handleLayout = React.useCallback(
      (event: Parameters<NonNullable<ScrollViewProps['onLayout']>>[0]) => {
        props.onLayout?.(event);
        scrollRef.current?.getNativeScrollRef()?.measureInWindow((_x, y, _width, height) => {
          runtime.scrollBounds.value = { bottom: y + height, top: y };
        });
      },
      [props.onLayout, runtime.scrollBounds],
    );

    React.useEffect(() => {
      return () => {
        runtime.scrollBounds.value = null;
        runtime.scrollOffset.value = 0;
      };
    }, [runtime.scrollBounds, runtime.scrollOffset]);

    return (
      <KeyboardAwareScrollView
        {...props}
        {...keyboardScrollProps}
        bounces={props.bounces ?? false}
        bottomOffset={16}
        disableScrollOnKeyboardHide
        mode="layout"
        nestedScrollEnabled={props.nestedScrollEnabled ?? true}
        onLayout={handleLayout}
        onScroll={handleScroll}
        overScrollMode={props.overScrollMode ?? 'never'}
        ref={setScrollRef}
        scrollEventThrottle={props.scrollEventThrottle ?? 16}
        ScrollViewComponent={ShellKeyboardScrollViewComponent}
        style={[styles.root, props.style]}
      />
    );
  },
);

ShellScrollView.displayName = 'ShellScrollView';

const styles = StyleSheet.create({
  root: {
    flexShrink: 1,
  },
});
