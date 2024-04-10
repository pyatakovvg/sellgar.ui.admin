export const lazy = async (fn: any) => {
  const result = await fn;
  return {
    Component: result,
  };
};
