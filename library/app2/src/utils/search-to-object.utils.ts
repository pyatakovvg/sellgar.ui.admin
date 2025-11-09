interface IOptions {
  converted?: boolean;
}

const convertStringToPrimitive = (value: string): number | boolean | string => {
  if (/^\d+(\.\d+)?$/.test(value)) {
    return Number(value);
  } else if (/^true|false$/.test(value)) {
    return value === 'true';
  }
  return value;
};

export const searchToObject = <T extends Record<string, any>>(searchParams: URLSearchParams, options: IOptions = { converted: true }): T => {
  const result: Partial<T> = {};

  searchParams.forEach((_, key, parent) => {
    const values = parent.getAll(key);

    if (options.converted) {
      result[key as keyof T] = values.map(convertStringToPrimitive) as any; // Приведение типов для корректности
    } else {
      result[key as keyof T] = values as any; // Приведение типов для корректности
    }
  });

  Object.keys(result).forEach((key) => {
    if (Array.isArray(result[key]) && result[key].length === 1) {
      result[key as keyof T] = result[key][0] as any;
    }
  });

  return result as T;
};
