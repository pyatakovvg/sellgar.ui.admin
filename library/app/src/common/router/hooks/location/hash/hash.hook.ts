import React from 'react';

import { useUrlChange } from './url-change.hook.ts';

const convertHashToObject = (hash: string) => {
  const normalizeHash = hash.replace('#', '');
  const result: Record<string, any> = {};

  if (!normalizeHash) {
    return result;
  }

  const parseValue = (value: any) => {
    if (value === undefined || value === '') return true;
    if (/^-?\d+$/.test(value)) return parseInt(value, 10);
    if (/^-?\d*\.\d+$/.test(value)) return parseFloat(value);
    if (value === 'true') return true;
    if (value === 'false') return false;
    if (value === 'null') return null;
    if (value === 'undefined') return undefined;

    return decodeURIComponent(value);
  };

  let match;
  const components = [];
  const componentRegex = /([a-zA-Z_]\w*)\(([^)]*)\)/g;

  while ((match = componentRegex.exec(normalizeHash)) !== null) {
    components.push({
      fullMatch: match[0],
      name: match[1],
      params: match[2],
    });
  }

  let remainingStr = normalizeHash;

  components.forEach((comp) => {
    remainingStr = remainingStr.replace(comp.fullMatch, '');
  });

  components.forEach((comp) => {
    if (comp.params.trim() === '') {
      result[comp.name] = true;
    } else {
      result[comp.name] = {};

      comp.params.split('&').forEach((param) => {
        const paramMatch = param.match(/^([^=]+)(?:=(.*))?$/);

        if (paramMatch) {
          const [, key, value] = paramMatch;

          if (key) {
            result[comp.name][key] = parseValue(value);
          }
        }
      });
    }
  });

  remainingStr
    .split('&')
    .filter((param) => param.trim() !== '')
    .forEach((param) => {
      const paramMatch = param.match(/^([^=]+)(?:=(.*))?$/);

      if (paramMatch) {
        const [, key, value] = paramMatch;

        if (key && !result[key]) {
          result[key] = parseValue(value);
        }
      }
    });

  return result;
};

export const useHash = () => {
  const [hash, setHash] = React.useState(() => convertHashToObject(location.hash));

  useUrlChange((location: any) => {
    setHash(convertHashToObject(location.hash));
  }, []);

  return hash;
};
