export const resolveNativeScreenOrder = (
  previous: readonly string[],
  available: readonly string[],
  focused: string | null,
): readonly string[] => {
  const availableKeys = new Set(available);
  const next = previous.filter((key) => availableKeys.has(key));

  for (const key of available) {
    if (!next.includes(key)) next.push(key);
  }

  if (focused) {
    const focusedIndex = next.indexOf(focused);

    if (focusedIndex >= 0) next.splice(focusedIndex, 1);
    next.push(focused);
  }

  return Object.freeze(next);
};
