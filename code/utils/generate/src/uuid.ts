export const uuid = (version: string = '4'): string => {
  switch (version) {
    default:
      return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c: string) => {
        const dig: number = Number(c);
        return (dig ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (dig / 4)))).toString(16);
      });
  }
};
