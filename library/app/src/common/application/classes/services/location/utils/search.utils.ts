type ParsedQuery = Record<string, string | string[]>;

export function parseSearchParams<T = ParsedQuery>(
  searchString: string = window.location.search,
  options: {
    decode?: boolean;
    parseArrays?: boolean;
    parseObjects?: boolean;
    arraySeparator?: string;
  } = {},
): T {
  const { decode = true, parseArrays = true, parseObjects = true, arraySeparator = ',' } = options;

  const searchParams = new URLSearchParams(searchString);
  const result: Record<string, any> = {};

  for (const [key, value] of searchParams.entries()) {
    const decodedKey = decode ? decodeURIComponent(key) : key;
    const decodedValue = decode ? decodeURIComponent(value) : value;

    setValue(result, decodedKey, decodedValue, {
      parseArrays,
      parseObjects,
      arraySeparator,
    });
  }

  return result as T;
}

const setValue = (
  obj: Record<string, any>,
  key: string,
  value: string,
  options: {
    parseArrays: boolean;
    parseObjects: boolean;
    arraySeparator: string;
  },
): void => {
  // Обработка вложенных объектов через точечную нотацию: user.name
  if (key.includes('.') && options.parseObjects) {
    const keys = key.split('.');
    let current = obj;

    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      if (!current[k] || typeof current[k] !== 'object') {
        current[k] = {};
      }
      current = current[k];
    }

    const lastKey = keys[keys.length - 1];
    setValue(current, lastKey, value, options);
    return;
  }

  // Обработка индексированных массивов: items[0], items[1]
  const arrayMatch = key.match(/^(.+)\[(\d+)]$/);
  if (arrayMatch && options.parseArrays) {
    const [, arrayKey, index] = arrayMatch;
    const idx = parseInt(index, 10);

    if (!obj[arrayKey] || !Array.isArray(obj[arrayKey])) {
      obj[arrayKey] = [];
    }

    // Заполняем пропущенные индексы
    while (obj[arrayKey].length <= idx) {
      obj[arrayKey].push(undefined);
    }

    obj[arrayKey][idx] = parseValue(value, options);
    return;
  }

  // Обработка квадратных скобок для массивов: items[]
  if (key.endsWith('[]') && options.parseArrays) {
    const arrayKey = key.slice(0, -2);

    if (!obj[arrayKey] || !Array.isArray(obj[arrayKey])) {
      obj[arrayKey] = [];
    }

    obj[arrayKey].push(parseValue(value, options));
    return;
  }

  // Обработка обычных ключей
  if (obj.hasOwnProperty(key)) {
    // Если ключ уже существует
    if (Array.isArray(obj[key])) {
      // Если уже массив - добавляем
      obj[key].push(parseValue(value, options));
    } else {
      // Если не массив - преобразуем в массив
      obj[key] = [obj[key], parseValue(value, options)];
    }
  } else {
    // Новый ключ
    obj[key] =
      options.parseArrays && value.includes(options.arraySeparator)
        ? value.split(options.arraySeparator).map((v) => parseValue(v.trim(), options))
        : parseValue(value, options);
  }
};

function parseValue(
  value: string,
  options: {
    parseObjects: boolean;
  },
): any {
  if (options.parseObjects && (value.startsWith('{') || value.startsWith('['))) {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === 'null') return null;
  if (value === 'undefined') return undefined;

  const num = Number(value);
  if (!isNaN(num) && value.trim() !== '') {
    return num;
  }

  return value;
}
